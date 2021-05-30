import React from "react";
import "./order.css";
import rightArrow from "../img/rightArrow.png";
import history from "../history";
import moment from "moment";
import { customerProfile, getActiveOrders } from "../api";
moment().format();

const Header = () => (
  <div className="title">
    <br />
    <br />
    <h1>Current Orders</h1>
    <button
      className="past"
      type="submit"
      value="past"
      onClick={() => history.push(`/cart/order/past`)}
    >
      View past orders
    </button>
    <br />
  </div>
);

/* Content component of Current Order Page */
class ListActiveOrder extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    orderList: [] as any[],
  };

  interval!: NodeJS.Timeout;

  /* Get active orders from api */
  activeOrders = () => {
    getActiveOrders().then(
      (response) => {
        var data = response.data;
        this.setState({ isLoaded: true, orderList: data });
      },
      (error) => {
        this.setState({ isLoaded: true, error });
        console.log(error);
      }
    );
  };

  /* During on page, re-render every second */
  async componentDidMount() {
    /* Get active orders */
    try {
      this.interval = setInterval(async () => {
        this.activeOrders();
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }

  /* Before rendering page */
  componentWillMount() {
    /* Check customer already logged in */
    customerProfile().then(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert("Please login");
        history.push("/customer/login");
        console.log(error);
      }
    );
  }

  /* Clear time interval when unmount */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { error, isLoaded, orderList } = this.state;
    if (error === true) {
      return <h2>No Order Present</h2>;
    } else if (isLoaded === false) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div className="content">
          {orderList.length > 0 ? (
            <div>
              {orderList.map((order, i) => (
                <div key={i}>
                  <button
                    className="order"
                    type="submit"
                    value="order"
                    onClick={() =>
                      history.push(`/order/active/status/?id=${order._id}`)
                    }
                  >
                    <img alt="right arrow" className="right" src={rightArrow} />
                    <h2>{order.vendorId.name}</h2>
                    <p id="ready">{order.status}</p>
                    <p className="date">
                      {moment(order.timestamps.placed).format(
                        "D MMM YYYY h.mm A"
                      )}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <h2>No current orders</h2>
          )}
        </div>
      );
    }
  }
}

const OrderCurrent = () => (
  <div>
    <Header />
    <ListActiveOrder />
  </div>
);

export default OrderCurrent;
