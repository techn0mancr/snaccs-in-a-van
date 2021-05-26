import React, { useEffect, useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import "./checkout.css";
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { addItemToCart, checkoutCart, getCart, getMenu } from "../api";
import { getId } from "../App";
import AddToCart from "../components/addToCart";

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
        <h1>Checkout</h1>
        <br></br>
      </div>
    );
  }
}

class Vendor extends React.Component {
  state = {
    profile: [] as any,
  };

  vendorId = getId() || "";

  componentDidMount() {
    getMenu(this.vendorId).then(
      (response) => {
        var data = response.data;
        this.setState({ profile: data.vendorId });
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    const { profile } = this.state;

    return (
      <div className="containerCheckout" id="loc">
        <h2 className="pickup">Pick up location</h2>
        <p className="address">{profile.name}</p>
        <p className="desc">
          {profile.locationDescription} ({profile.latitude},{profile.longitude})
        </p>
      </div>
    );
  }
}

export interface ItemId {
  _id: string;
  name: string;
  price: number;
}

export interface CartItem {
  _id: string;
  itemId: ItemId;
  quantity: number;
  subtotal: number;
}

const Information = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cart, setCart] = useState<Array<CartItem>>([]);
  const [error, setError] = useState();

  useEffect(() => {
    getCart().then(
      (response) => {
        const data = response.data;
        setCart(data);
        setIsLoaded(true);
        console.log(response);
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
        console.log(error);
      }
    );
  }, []);

  const updateItemInCart = (
    itemId: string,
    countToSet: number,
    isRemoving?: boolean,
  ): void => {
    const updatedCart = cart.map((cartItem: CartItem) => {
      if (cartItem._id === itemId) {
        addItemToCart(cartItem.itemId._id, isRemoving ? -1 : 1);
        return {
          ...cartItem,
          quantity: countToSet,
          subtotal: cartItem.itemId.price * countToSet,
        };
      } else {
        return cartItem;
      }
    }) as CartItem[];
    setCart(updatedCart);
  };

  return (
    <div>
      <div className="containerCheckout" id="cart">
        <h2>Your Cart</h2>
        {cart.map((item: CartItem, i: number) => (
          <div key={i}>
            <div className="cart">
              <div className="item">
                <h3>
                  {item.quantity} x {item.itemId.name}
                </h3>
              </div>
              <div className="number">
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      updateItemInCart(
                        item._id,
                        Math.max(item.quantity - 1, 0),
                        true
                      );
                    }}
                  >
                    {" "}
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <input
                    className="quantity-input__screen"
                    type="text"
                    value={item.quantity}
                    readOnly
                  />
                  <Button
                    onClick={() => {
                      updateItemInCart(item._id, item.quantity + 1);
                    }}
                  >
                    {" "}
                    <AddIcon fontSize="small" />
                  </Button>
                  {/* <Badge color="secondary" badgeContent={itemCount}></Badge> */}
                </ButtonGroup>
              </div>
              <p className="price">${item.subtotal}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="containerCheckout" id="payment">
            <h2>Payment</h2>
    
            <div className="amount">
                <h3 className="payment">Total amount</h3>
                <h3 className="value">${cart.subtotal}</h3>
            </div>
            <br></br><br></br><br></br>
            
            <div className="amountPaid">
                <h3 className="payment">Amount to be paid</h3>
                <h3 className="value">${cart.subtotal}</h3>
            </div>
        </div> */}
    </div>
  );
};

const CheckoutButton = () => {
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    checkoutCart();
    history.push(`/cart/order/active`);
  };

  return (
    <div className="fixed-bottom orderCheckout">
      <button
        className="orderCheckout"
        type="submit"
        value="order"
        onClick={handleSubmit}
      >
        <h3 className="payment" id="order">
          Place order
        </h3>
      </button>
    </div>
  );
};

const Checkout = () => (
  <div>
    <Header />
    <Vendor />
    <Information />
    <CheckoutButton />
  </div>
);

export default Checkout;
