import React from "react";
import './orderStatus.css';
import leftArrow from '../img/leftArrow.png';
import order from '../img/orderStatus/order.png';
import prepare from '../img/orderStatus/prepare.png';
import ready from '../img/orderStatus/ready.png';
import dashLine from '../img/orderStatus/dashLine.png';
import moment from "moment";
import { getId } from "../App";
import { getOrderDetails } from "../api";
import history from "../history";
moment().format();

const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
};

function toTwoDecimalPlaces(number: number) {
    return number.toLocaleString(undefined, currencyOptions);
}

class Header extends React.Component {
    render() {
        return (
            <div className="titleOrder">
                <br></br><br></br>
                <input type="image" className="back" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1>Order Status</h1>
            </div>
        )
    }
}

class Status extends React.Component {
    state = {
        details: [] as any,
        timeStamps: [] as any,
        fulfilled: false,
        hour: 0,
        minute: 0,
        second: 0,
        showEdit: false,
        showDiscount: false,
        totalAmount: 0,
        paidAmount: 0,
        discount: 0,
    }

    orderId = getId() || "";
    interval!: NodeJS.Timeout;

    async componentDidMount() {
        try {
            this.interval = setInterval(async () => { 
                this.orderDetails(this.orderId);
                var now = moment(new Date());
                var end = moment(this.state.timeStamps.placed);
                var duration = moment.duration(now.diff(end));
                this.setState({hour: duration.hours(), minute: duration.minutes(), second: duration.seconds()});
                this.checkTimeLimit();
                this.checkDiscount();
                console.log(duration);
            }, 1000);
            } catch(e) {
                console.log(e);
            }
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    checkTimeLimit() {
        const {hour, minute} = this.state;
        if (minute < 10 && hour < 0) {
            this.setState({showEdit: true});
        }
    }

    orderDetails(orderId: String) {
        getOrderDetails(orderId).then(
            (response) => {
                var data = response.data;
                this.setState({ details: data, timeStamps: data.timestamps,paidAmount: data.total,
                    totalAmount: data.total });
                if (data.status === "Fulfilled") {
                    this.setState({fulfilled: true});
                } else if (data.status === "Completed") {
                    history.push(`/order/details/?id=${this.orderId}`)
                }
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    checkDiscount() {
        const { timeStamps, paidAmount } = this.state;
        var fulfilled = moment(timeStamps.fulfilled);
        console.log(timeStamps.fulfilled);
        console.log(timeStamps.placed);
        var placed = moment(timeStamps.placed);
        var duration = moment.duration(fulfilled.diff(placed));
        if (duration.minutes() > 15 || duration.hours() > 0) {
          var totalAmount = paidAmount*1.25;
          var discount = totalAmount-paidAmount;
          this.setState({showDiscount: true, totalAmount: totalAmount, discount: discount});
        }
      }
 
    render() {
        const { details, fulfilled, timeStamps, hour, minute, second, showEdit, showDiscount, totalAmount, discount, paidAmount} = this.state;

        return (
            <div>
                <div className="titleOrder">
                    <h2 className="invoice">INVOICE: {details._id}</h2>
                    <h2 className="invoice">{moment(timeStamps.placed).format("D MMM YYYY h.mm A")}</h2>
                </div>

                <div className="orderTime">
                    <h4 className="time">Time Elapsed: {hour}h {minute}m {second}s</h4>
                    {showEdit ?
                        <button className="cancel" type="submit" value="edit" onClick={() => history.push(`/order/checkout`)}>Edit or Cancel Order</button>
                    :null}
                </div>

                <div className="orderTime">

                    <div className="progressImage">
                        <img className="status" src={order} alt="Order"/>
                        <img className="status line" src={dashLine} alt="Line"/>
                        <img className="status" src={prepare} alt="Prepare"/>
                        { fulfilled ?
                            <div>
                                <img className="status line" src={dashLine} alt="Line"/>
                                <img className="status" src={ready} alt="Ready"/>
                            </div>
                        :
                        <div>
                            <img className="status line" id="notReady" src={dashLine} alt="Line"/>
                            <img className="status" id="notReady" src={ready} alt="Ready"/>
                        </div>
                        }
                    </div>

                    <br />
                    
                    <div className="progressStatus">
                        <div className="status">
                            <h3>Order received</h3>
                            <p className="time" id="status">{moment(timeStamps.placed).format("D MMM YYYY h.mm A")}</p>
                        </div>
            
                        <div className="status">
                            <h3>Preparing order</h3>
                            <p className="time" id="status">{moment(timeStamps.placed).format("D MMM YYYY h.mm A")}</p>
                        </div>
                        {fulfilled ?
                        <div className="status">
                            <h3>Ready for pickup</h3>
                            <p className="time" id="status">{moment(timeStamps.fulfilled).format("D MMM YYYY h.mm A")}</p>
                        </div>
                        :
                        <div className="status">
                            <h3 id="notReady">Ready for pickup</h3>
                        </div>
                        }
                    </div>
                </div>
                
                {fulfilled ?
                <div className="containerCheckout" id="payment">
                    <h2>Payment</h2>
                
                    <div className="amount">
                        <h3 className="payment">Total amount</h3>
                        <h3 className="value">${toTwoDecimalPlaces(totalAmount)}</h3>
                    </div>
                    {showDiscount? 
                        <div className="amount">
                        <h3 className="payment">20% discount</h3>
                        <h3 className="value">${discount}</h3>
                        </div>
                        :
                        <div>
                        <br></br>
                        <br></br>
                        </div>
                        }
                    
                    <br></br>
                    
                    <div className="amountPaid">
                        <h3 className="payment">Amount to be paid</h3>
                        <h3 className="value">${toTwoDecimalPlaces(paidAmount)}</h3>
                    </div>
                </div>
                :
                null}
            </div>
        )
    }
}

class OrderStatus extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Status />
            </div>
        )
    }
}

export default OrderStatus;