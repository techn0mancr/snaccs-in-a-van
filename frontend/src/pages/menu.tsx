import React from "react";
import "./menu.css";
import axios from "axios";
import history from "../history";

class VanInfo extends React.Component {
  render() {
    return (
      <div className="van-card">
        <div className="van-image"></div>
        <div className="van-container">
          <h1 className="menu-h1">Tasty Trailer</h1>
          <h2 className="menu-h2">757 Swanston St, Parkville VIC 3010</h2>
          <br />
          <h3 className="menu-h3">next to Stop 1</h3>
          <p className="menu-p">0.25 km away from you</p>
        </div>
      </div>
    );
  }
}

class Items extends React.Component {
  state = {
    vendorId: "60707b103ed89dee65af78a2",
    error: null,
    isLoaded: false,
    menuList: [] as any[],
  };

  async getMenu(vendorId: String) {
    const BASE_URL = "http://localhost:48080/api";
    const endpoint = `${BASE_URL}/menu/${vendorId}`;
    return await axios.get(endpoint).then(
      (response) => {
        var data = response.data;
        this.setState({ isLoaded: true, menuList: data });
        console.log(response);
      },
      (error) => {
        this.setState({ isLoaded: true, error });
        console.log(error);
      }
    );
  }

  componentDidMount() {
    this.getMenu(this.state.vendorId);
  }

  render() {
    const { error, isLoaded, menuList } = this.state;
    if (error == true) {
      return <h2>No menu at the moment</h2>;
    } else if (isLoaded == false) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div className="menu">
          {menuList.map((menu, i) => (
            <div key={i}>
              <div className="menu-card">
                {/* changes here */}
                <img
                  src={`data:${menu.itemId.mimetype};base64,${menu.itemId.data}`}
                  className="card"
                  alt="cappucino"
                />
                <div className="menu-container">
                  <button
                    type="button"
                    className="menu-button"
                    onClick={() =>
                      history.push(`/menu/item/id?=${menu.itemId._id}`)
                    }
                  >
                    Add
                  </button>
                  <h2 className="menu-h2">{menu.itemId.name}</h2>
                  <br />
                  <h3 className="menu-h3">${menu.itemId.price}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

class Checkout extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    cart: [] as any,
  };

  async getCart() {
    const BASE_URL = "http://localhost:48080/api";
    const endpoint = `${BASE_URL}/customer/cart`;
    return await axios.get(endpoint).then(
      (response) => {
        var data = response.data;
        this.setState({ isLoaded: true, cart: data });
        console.log(response);
      },
      (error) => {
        this.setState({ isLoaded: true, error });
        console.log(error);
      }
    );
  }

  componentDidMount() {
    this.getCart();
  }

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    history.push("/order/checkout");
  };

  render() {
    const { cart } = this.state;
    if (cart.length == 0) {
      return <div></div>;
    } else {
      return (
        <div className="fixed-bottom orderCheckout">
          <button
            className="orderCheckout"
            type="submit"
            value="order"
            onClick={this.handleSubmit}
          >
            <h3 className="payment" id="order">
              Checkout
            </h3>
          </button>
        </div>
      );
    }
  }
}

class Menu extends React.Component {
  render() {
    return (
      <div>
        <VanInfo />
        <Items />
        <Checkout />
      </div>
    );
  }
}

export default Menu;
