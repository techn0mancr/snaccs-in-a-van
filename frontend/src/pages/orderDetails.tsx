/* Import the required libraries and types */
import React from "react";
import moment from "moment";

/* Import components */
import "./order.css";
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { getOrderDetails, getId } from "../api";
moment().format();

/* Put currency option */
const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

/* Return number into 2 decimal places */
function toTwoDecimalPlaces(number: number) {
  return number.toLocaleString(undefined, currencyOptions);
}

/* Header component of Order Details Page */
class Header extends React.Component {
  render() {
    return (
      <div className="title">
        <br></br>
        <input type="image" alt="back" className="back" src={leftArrow} onClick={() => history.goBack()}/>
        <h1>Order</h1>
        <br></br>
      </div>
    )
  }
}

/* Content component of Order Details Page */
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
    isLoaded: false
  }
  orderId = getId() || "";

  /* Before rendering page */
  componentWillMount() {
    this.orderDetails(this.orderId);
  }

  /* During on page */
  componentDidMount() {
    this.checkDiscount();
  }  

  /* Get order details from api */
  orderDetails(orderId: String) {
    getOrderDetails(this.orderId).then(
      (response) => {
        var data = response.data;
        this.setState({isLoaded: true, details: data, timeStamps: data.timestamps,vendorId: data.vendorId, items: data.items, rating: data.rating,paidAmount: data.total})
        this.checkDiscount();;
        console.log(response);
      }, (error) => {
        this.setState({ isLoaded: true, error });
        console.log(error);
      }
    )
  }

   /* Check if there is discount if more than 15 minutes */
  checkDiscount() {
    const { timeStamps, paidAmount } = this.state;
    var fulfilled = moment(timeStamps.fulfilled);
    var placed = moment(timeStamps.placed);
    var duration = moment.duration(fulfilled.diff(placed));

     /* Count the values if more than 15 minutes */
    if (duration.minutes() > 15 || duration.hours() > 0) {
      var totalAmount = paidAmount*1.25;
      var discount = totalAmount-paidAmount;
      this.setState({showDiscount: true, totalAmount: totalAmount, discount: discount});
    } else {
      this.setState({totalAmount: paidAmount});
    }

    console.log(timeStamps.fulfilled);
    console.log(timeStamps.placed);
  }

  render() {
    const { showDiscount, error, details, vendorId, items, timeStamps, rating, paidAmount, totalAmount, discount, isLoaded } = this.state;

    if (error === true) {
      return <h3 className ="error">fail</h3>;
    } else if (isLoaded === false) {
      return (
        <div>
          <div className="title">
            <h2 className="invoice">INVOICE: Loading...</h2>
            <br />
            <h2 className="invoice">Loading...</h2>
          </div>
        </div>
      )
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
              :null
            }
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
              <p className="price">${toTwoDecimalPlaces(totalAmount)}</p>
            </div>
            {showDiscount? 
              <div className="amount">
                <div className="item">
                <p className="desc">20% discount</p>
                </div>
                <p className="price">-${toTwoDecimalPlaces(discount)}</p>
              </div>
              :<div>
                <br></br>
                <br></br>
              </div>
            }

            <div className="amountPaid">
            <div className="item">
              <p className="desc">Amount to be paid</p>
              </div>

              <p className="price">${toTwoDecimalPlaces(paidAmount)}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

/* Render all components on Order Details Page */
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
