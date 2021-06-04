/* Import the required libraries and types */
import React from "react";
import moment from "moment";

/* Import components */
import "./orderStatus.css";
import leftArrow from "../img/leftArrow.png";
import order from "../img/orderStatus/order.png";
import prepare from "../img/orderStatus/prepare.png";
import ready from "../img/orderStatus/ready.png";
import dashLine from "../img/orderStatus/dashLine.png";
import { getOrderDetails, getId, cancelOrder } from "../api";
import history from "../history";
moment().format();

/* Put currency option */
const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

/* Return number into 2 decimal places */
function toTwoDecimalPlaces(number: number) {
  return number.toLocaleString(undefined, currencyOptions);
}

/* Header component of Order Status Page */
const Header = () => (
  <div className="titleOrder">
    <br></br>
    <br></br>
    <input
      type="image"
      className="back"
      alt="back"
      src={leftArrow}
      onClick={() => history.goBack()}
    />
    <h1 className="titleLog">Order Status</h1>
  </div>
);

/* Content component of Order Status Page */
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
    isLoaded: false,
    vendorId: {} as any,
  };
  orderId = getId() || "";
  interval!: NodeJS.Timeout;

  /* During on page, re-render every second */
  async componentDidMount() {
    /* Get order information, and count time */
    try {
      this.interval = setInterval(async () => {
        this.orderDetails(this.orderId);
        var now = moment(new Date());
        var end = moment(this.state.timeStamps.placed);
        var duration = moment.duration(now.diff(end));
        this.setState({
          hour: duration.hours(),
          minute: duration.minutes(),
          second: duration.seconds(),
        });
        this.checkTimeLimit();
        this.checkDiscount();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  /* Clear time interval when unmount */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /* Check if time is within 10 minutes */
  checkTimeLimit() {
    const { hour, minute } = this.state;
    if (minute < 10 && hour <= 0) {
      this.setState({ showEdit: true });
    }
  }

  /* Get order details from api */
  orderDetails(orderId: String) {
    getOrderDetails(orderId).then(
      (response) => {
        var data = response.data;
        this.setState({
          details: data,
          timeStamps: data.timestamps,
          paidAmount: data.total,
          isLoaded: true,
          vendorId: data.vendorId,
        });
        if (data.status === "Fulfilled") {
          this.setState({ fulfilled: true });
        } else if (data.status === "Completed") {
          history.push(`/order/details/?id=${this.orderId}`);
        }
      },
      (error) => {
        this.setState({ isLoaded: true });
        console.log(error);
      }
    );
  }

  /* Check if there is discount if more than 15 minutes */
  checkDiscount() {
    const { timeStamps, paidAmount } = this.state;
    var fulfilled = moment(timeStamps.fulfilled);
    var placed = moment(timeStamps.placed);
    var duration = moment.duration(fulfilled.diff(placed));

    /* Count the values if more than 15 minutes */
    if (duration.minutes() > 15 || duration.hours() > 0) {
      var totalAmount = paidAmount * 1.25;
      var discount = totalAmount - paidAmount;
      this.setState({
        showDiscount: true,
        totalAmount: totalAmount,
        discount: discount,
      });
    } else {
      this.setState({ totalAmount: paidAmount });
    }
  }

  render() {
    const {
      details,
      fulfilled,
      timeStamps,
      hour,
      minute,
      second,
      showEdit,
      showDiscount,
      totalAmount,
      discount,
      paidAmount,
      isLoaded,
      vendorId,
    } = this.state;

    if (isLoaded === false) {
      return (
        <div className="orderTime">
          <h2 className="nVan">Loading...</h2>
        </div>
      );
    } else {
      return (
        <div>
          <div className="orderTime">
            <h2 className="nVan">
              Time Elapsed: {hour}h {minute}m {second}s
            </h2>
            {showEdit && vendorId ? (
              <>
                <button
                  className="cancel"
                  type="submit"
                  value="edit"
                  onClick={() =>
                    history.push(
                      `/order/checkout/?id=${vendorId._id}&orderId=${this.orderId}`
                    )
                  }
                >
                  Edit Order
                </button>
                <button
                  className="cancel"
                  type="submit"
                  value="edit"
                  onClick={() =>
                    cancelOrder(this.orderId).then((res) => {
                      alert("Order was canccelled!");
                      history.push("/cart/order/active");
                    })
                  }
                >
                  Cancel Order
                </button>
              </>
            ) : null}
          </div>

          <div className="titleOrder">
            <p className="item">Invoice: {details._id}</p>
            <p className="item">
              {moment(timeStamps.placed).format("DD MMM YYYY h.mm A")}
            </p>
          </div>

          <div className="orderTime">
            <div className="progressImage">
              <img className="status" src={order} alt="Order" />
              <img className="status line" src={dashLine} alt="Line" />
              <img className="status" src={prepare} alt="Prepare" />
              {fulfilled ? (
                <div>
                  <img className="status line" src={dashLine} alt="Line" />
                  <img className="status" src={ready} alt="Ready" />
                </div>
              ) : (
                <div>
                  <img
                    className="status line"
                    id="notReady"
                    src={dashLine}
                    alt="Line"
                  />
                  <img
                    className="status"
                    id="notReady"
                    src={ready}
                    alt="Ready"
                  />
                </div>
              )}
            </div>
            <br />

            <div className="progressStatus">
              <div className="status">
                <h2 className="nVan">Order received</h2>
                <p className="time" id="status">
                  {moment(timeStamps.placed).format("D MMM YYYY h.mm A")}
                </p>
              </div>

              <div className="status">
                <h2 className="nVan">Preparing order</h2>
                <p className="time" id="status">
                  {moment(timeStamps.placed).format("D MMM YYYY h.mm A")}
                </p>
              </div>
              {fulfilled ? (
                <div className="status">
                  <h2 className="nVan">Ready for pickup</h2>
                  <p className="time" id="status">
                    {moment(timeStamps.fulfilled).format("D MMM YYYY h.mm A")}
                  </p>
                </div>
              ) : (
                <div className="status">
                  <h2 className="nVan" id="notReady">
                    Ready for pickup
                  </h2>
                </div>
              )}
            </div>
          </div>

          {fulfilled ? (
            <div className="containerCheckout" id="payment">
              <h2>Payment</h2>

              <div className="amount">
                <div className="item">
                  <p className="desc">Total amount</p>
                </div>
                <p className="price">${toTwoDecimalPlaces(totalAmount)}</p>
              </div>

              {showDiscount ? (
                <div className="amount">
                  <div className="item">
                    <p className="desc">20% discount</p>
                  </div>
                  <p className="price">-${toTwoDecimalPlaces(discount)}</p>
                </div>
              ) : (
                <div>
                  <br></br>
                  <br></br>
                </div>
              )}
              <br></br>

              <div className="amountPaid">
                <div className="item">
                  <p className="desc">Amount to be paid</p>
                </div>
                <p className="price">${toTwoDecimalPlaces(paidAmount)}</p>
              </div>
            </div>
          ) : null}
        </div>
      );
    }
  }
}

/* Render all components on Order Status Page */
const OrderStatus = () => (
  <div>
    <Header />
    <Status />
  </div>
);

export default OrderStatus;
