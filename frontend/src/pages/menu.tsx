import React, { useEffect, useState } from "react";
import "./menu.css";
import history from "../history";
import { getMenu, getCart, getDistance } from "../api";
import leftArrow from "../img/leftArrow.png";
import { getId } from "../App";

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function toTwoDecimalPlaces(number: number) {
  return number.toLocaleString(undefined, currencyOptions);
}

interface Profile {
  name: string;
  locationDescription: string;
  geolocation: number[];
}

const VanInfo = () => {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    locationDescription: "",
    geolocation: [0,0]
  });
  const vendorId = getId() || "";

  useEffect(() => {
    getMenu(vendorId)
      .then(
        (response) => {
          setProfile(response.data.vendorId);
        },
        (error) => console.log("Got an error fetching the Profile: ", error)
      )
      .catch((error) =>
        console.log("Got an error fetching the Profile: ", error)
      );
  }, []);

  return (
    <div className="van-card">
      <input
        type="image"
        alt="back"
        className="back"
        src={leftArrow}
        onClick={() => history.goBack()}
      />
      <div className="van-image"></div>
      <div className="van-container">
        <h1 className="menu-h1">{profile?.name}</h1>
        <h2 className="menu-h2">{profile?.locationDescription}</h2>
        {/* <br />
        <h3 className="menu-h3">
          {profile.geolocation[0]}, {profile.geolocation[1]}
        </h3> */}
        <p className="menu-p">{getDistance([localStorage.getItem("lat") as unknown as number, 
                                            localStorage.getItem("lng") as unknown as number],
                                             profile.geolocation)} km away from you</p>
      </div>
    </div>
  );
};

interface ItemsProps {
  openModalForAddingItemWithId: (id: string) => void;
}

const Items = ({ openModalForAddingItemWithId }: ItemsProps) => {
  const vendorId = getId() || "";
  const [state, setState] = useState({
    vendorId,
    error: null,
    isLoaded: false,
    menuList: [] as any[],
  });

  useEffect(() => {
    getMenu(state.vendorId).then(
      (response) => {
        var data = response.data.items;
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
              <button
                type="button"
                className="menu-button"
                onClick={() => openModalForAddingItemWithId(menu.itemId._id)}
              >
                Add{" "}
              </button>
              <h2 className="menu-h2">{menu.itemId.name}</h2>
              <br />
              <h3 className="menu-h3">
                ${toTwoDecimalPlaces(menu.itemId.price)}
              </h3>
            </div>
          </div>
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
