import React, { useEffect, useState } from "react";
import "./menu.css";
import history from "../history";
import { getMenu, getCart } from "../api";
import { getId } from "../App";

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function toTwoDecimalPlaces(number: number) {
  return number.toLocaleString(undefined, currencyOptions);
}

const VanInfo = () => (
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

interface ItemsProps {
  openModalForAddingItemWithId: (id: string) => void;
}

const Items = ({ openModalForAddingItemWithId }: ItemsProps) => {
  const [state, setState] = useState({
    vendorId: "60707b103ed89dee65af78a2",
    error: null,
    isLoaded: false,
    menuList: [] as any[],
  });

  useEffect(() => {
    getMenu(state.vendorId).then(
      (response) => {
        var data = response.data;
        setState({ ...state, isLoaded: true, menuList: data });
        console.log(response);
      },
      (error) => {
        setState({ ...state, isLoaded: true, error });
        console.log(error);
      }
    );
  }, []);

  return state.error ? (
    <h2>No menu at the moment</h2>
  ) : !state.isLoaded ? (
    <h2>Loading...</h2>
  ) : (
    <div className="menu">
      {state.menuList.map((menu, i) => (
        <div key={i}>
          <div className="menu-card">
            <img
              src={`data:${menu.itemId.mimetype};base64,${menu.itemId.data}`}
              className="card"
              alt={menu.itemId.name}
            />
            <div className="menu-container">
              {/* EDIT THIS BUTTON */}
              <button
                type="button"
                className="menu-button"
                onClick={() => openModalForAddingItemWithId(menu.itemId._id)}
              >
                Add{" "}
              </button>
              {/* <button type="button" className="menu-button" onClick={() => addToCart(menu.itemId._id)}>Add </button> */}
              <h2 className="menu-h2">{menu.itemId.name}</h2>
              <br />
              <h3 className="menu-h3">
                ${toTwoDecimalPlaces(menu.itemId.price)}
              </h3>
            </div>
          </div>
          {/* {popupItem && addToCart(menu.itemId._id)} */}
        </div>
      ))}
    </div>
  );
};

class Checkout extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    cart: [] as any,
    logged: false,
  };

  vendorId = getId() || "";


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
    history.push(`/order/checkout/?id=${this.vendorId}`);
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

interface MenuProps {
  openModalForAddingItemWithId: (id: string) => void;
}

const Menu = ({ openModalForAddingItemWithId }: MenuProps) => (
  <div>
    <VanInfo />
    <Items openModalForAddingItemWithId={openModalForAddingItemWithId} />
    <Checkout />
  </div>
);

export default Menu;
