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
        fulfilled: false
    }

    orderId = getId() || "";

    componentDidMount() {
        try {
            setInterval(async () => { 
                this.orderDetails(this.orderId);
            }, 60000);
            } catch(e) {
                console.log(e);
            }
    }

    orderDetails(orderId: String) {
        getOrderDetails(orderId).then(
            (response) => {
                var data = response.data;
                this.setState({ details: data, timeStamps: data.timestamps });
                if (data.status === "Fulfilled") {
                    this.setState({fulfilled: true});
                } else if (data.status === "Completed") {
                    history.push(`/order/details/?id=${this.orderId}`)
                }
                console.log(data.status);
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    render() {
        const { details, fulfilled, timeStamps } = this.state;

        return (
            <div>
                <div className="titleOrder">
                    <h2 className="invoice">INVOICE: {details._id}</h2>
                    <h2 className="invoice">{moment(timeStamps.placed).format("D MMM YYYY h.mm A")}</h2>
                </div>

                <div className="orderTime">
                    <h4 className="time">Time Elapsed: 5m 30s</h4>
                    <button className="cancel" type="submit" value="edit" onClick={() => history.push(`/order/checkout`)}>Edit or Cancel Order</button>
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
                        <h3 className="value">${toTwoDecimalPlaces(details.total)}</h3>
                    </div>
                    <br></br><br></br><br></br>
                    
                    <div className="amountPaid">
                        <h3 className="payment">Amount to be paid</h3>
                        <h3 className="value">${toTwoDecimalPlaces(details.total)}</h3>
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