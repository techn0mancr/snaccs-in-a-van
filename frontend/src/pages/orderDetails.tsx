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
  };

  orderId = getId() || "";

  componentDidMount() {
    getOrderDetails(this.orderId).then(
      (response) => {
        var data = response.data;
        this.setState({
          isLoaded: true,
          details: data,
          vendorId: data.vendorId,
          items: data.items,
        });
        console.log(response);
      }, (error) => {
        this.setState({ isLoaded: true, error });
        console.log(error);
      }
    );
  }

  render() {
    const { error, details, vendorId, items } = this.state;

    if (error === true) {
      return <h2>fail</h2>;
    } else {
      return (
        <div>
          <div className="title">
            <h2 className="invoice">INVOICE: {details._id}</h2>
            <br />
            <h2 className="invoice">
              {moment(details.placedTimestamp).format("D MMM YYYY h.mm A")}
            </h2>
          </div>

          <div className="containerCheckout" id="loc">
            <h2 className="pickup">Pick up location</h2>
            <p className="address">{vendorId.name}</p>
            <p className="desc">{vendorId.locationDescription}</p>
          </div>

          <div className="containerCheckout" id="cart">
            <h2>Your Cart</h2>
            {items.map((item, i) => (
              <div key={i}>
                <div className="cart">
                  <div className="item">
                    <h3>
                      {item.quantity}x {item.itemId.name}
                    </h3>
                  </div>

                  <p className="price">${toTwoDecimalPlaces(item.subtotal)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="containerCheckout" id="payment">
            <h2>Payment</h2>

            <div className="amount">
              <h3 className="payment">Total amount</h3>
              <h3 className="value">${details.total}</h3>
            </div>
            <br></br>
            <br></br>
            <br></br>

            <div className="amountPaid">
              <h3 className="payment">Amount to be paid</h3>
              <h3 className="value">${details.total}</h3>
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
