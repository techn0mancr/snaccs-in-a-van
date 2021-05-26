import React from "react";
import "./order.css";
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import moment from "moment";
import { getId } from "../App";
import { getOrderDetails } from "../api";
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
      <div className="title">
        <br></br>
        <input
          type="image"
          alt="back"
          className="back"
          src={leftArrow}
          onClick={() => history.goBack()}
        />
        <h1>Order</h1>
        <br></br>
      </div>
    );
  }
}

class Information extends React.Component {
  state = {
    error: null,
    details: [] as any,
    items: [] as any[],
    vendorId: [] as any,
    timeStamps: [] as any,
    rating: null,
    showDiscount: false,
    totalAmount: 0,
    paidAmount: 0,
    discount: 0,
  };

  orderId = getId() || "";

  componentWillMount() {
    this.orderDetails(this.orderId);
  }

  componentDidMount() {
    this.checkDiscount();
  }  

  orderDetails(orderId: String) {
    getOrderDetails(this.orderId).then(
      (response) => {
        var data = response.data;
        this.setState({
          isLoaded: true,
          details: data,
          timeStamps: data.timestamps,
          vendorId: data.vendorId,
          items: data.items,
          rating: data.rating,
          paidAmount: data.total,
          totalAmount: data.total
        })
        this.checkDiscount();;
        console.log(response);
      }, (error) => {
        this.setState({ isLoaded: true, error });
        console.log(error);
      }
    );
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
    const { showDiscount, error, details, vendorId, items, timeStamps, rating, paidAmount, totalAmount, discount } = this.state;

    if (error === true) {
      return <h3 className ="error">fail</h3>;
    } else {
      return (
        <div>
          <div className="title">
            <h2 className="invoice">INVOICE: {details._id}</h2>
            <br />
            <h2 className="invoice">
              {moment(timeStamps.completed).format("D MMM YYYY h.mm A")}
            </h2>
            <br/>
            {rating == null ?
            <button className="signup" type="submit" value="signup" onClick={() => history.push(`/order/rate/?id=${this.orderId}`)}><h2>Rate Order</h2></button>
            :null}
          </div>

          <div className="containerCheckout" id="loc">
            <h2 className="pickup">Pick up location</h2>
            <p className="desc">{vendorId.name}</p>
            <p className="desc">{vendorId.locationDescription}</p>
          </div>

          <div className="containerCheckout" id="cart">
            <h2>Your Cart</h2>
            {items.map((item, i) => (
              <div key={i}>
                <div className="cart">
                  <div className="item">
                    <p className="desc">
                      {item.quantity}x {item.itemId.name}
                    </p>
                  </div>
                  <p className="price">${toTwoDecimalPlaces(item.subtotal)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="containerCheckout" id="payment">
            <h2>Payment</h2>

            <div className="amount">
              <div className="item">
              <p className="desc">Total amount</p>
              </div>
              <p className="price">${totalAmount}</p>
            </div>
            {showDiscount? 
            <div className="amount">
              <div className="item">
              <p className="desc">20% discount</p>
              </div>
              <p className="price">-${discount}</p>
            </div>
            :
            <div>
              <br></br>
              <br></br>
            </div>
            }
            
            
            <hr></hr>
            <div className="amountPaid">
            <div className="item">
              <p className="desc">Amount to be paid</p>
              </div>

              <p className="price">${paidAmount}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

class OrderDetails extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Information />
      </div>
    );
  }
}

export default OrderDetails;
