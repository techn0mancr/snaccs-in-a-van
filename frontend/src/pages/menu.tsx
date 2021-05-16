import React from "react";
import "./menu.css";
import history from "../history";
import { getMenu, getCart } from "../api";


const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

function toTwoDecimalPlaces(number: number) {
    return number.toLocaleString(undefined, currencyOptions);
  }



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
    menuList: [] as any[]
  };

  componentDidMount() {
    getMenu(this.state.vendorId).then(
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

  render() {
    const { error, isLoaded, menuList } = this.state;
    if (error === true) {
      return <h2>No menu at the moment</h2>;
    } else if (isLoaded === false) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div className="menu">
          {menuList.map((menu, i) => (
            <div key={i}>
              <div className="menu-card">
                <img
                  src={`data:${menu.itemId.mimetype};base64,${menu.itemId.data}`}
                  className="card"
                  alt={menu.itemId.name}
                />
                <div className="menu-container">
                  <button type="button" className="menu-button" onClick={() => history.push(`/menu/item/?id=${menu.itemId._id}`) }>Add </button>
                  {/* <button type="button" className="menu-button" onClick={() => addToCart(menu.itemId._id)}>Add </button> */}
                  <h2 className="menu-h2">{menu.itemId.name}</h2>
                  <br />
                  <h3 className="menu-h3">${toTwoDecimalPlaces(menu.itemId.price)}</h3>
                </div>
              </div>
              {/* {popupItem && addToCart(menu.itemId._id)} */}
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
    logged: false,
  };

  componentDidMount() {
    getCart().then(
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

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    history.push("/order/checkout");
  };

  render() {
    const { cart } = this.state;
    if (cart.length === 0) {
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
