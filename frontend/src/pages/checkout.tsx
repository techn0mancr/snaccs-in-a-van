/* Import the required libraries and types */
import React, { useEffect, useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

/* Import components */
import "./checkout.css";
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import {
  addItemToCart,
  checkoutCart,
  getCart,
  getMenu,
  getId,
  amendInitialize,
  amendFinalize,
} from "../api";

/* Put currency option */
const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

/* Return number into 2 decimal places */
function toTwoDecimalPlaces(number: number) {
  return number.toLocaleString(undefined, currencyOptions);
}

/* Header component of Checkout Page */
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

interface VendorProps {
  vendorId: string;
  orderId: string;
}

/* Vendor information component of Checkout Page */
class Vendor extends React.Component<VendorProps> {
  state = {
    profile: [] as any,
    lat: "",
    lng: "",
  };
  // vendorId = getId() || "";

  /* During on page */
  componentDidMount() {
    const { vendorId, orderId } = this.props;
    /* Get information of vendor */
    getMenu(vendorId).then(
      (response) => {
        var data = response.data;
        this.setState({
          profile: data.vendorId,
          lat: data.vendorId.geolocation[0],
          lng: data.vendorId.geolocation[1],
        });
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    /* If page has been redirected with orderID in the address, initialise order amendment */
    if (orderId) {
      amendInitialize(orderId)
        .then((res) => {
          console.log(res);
        })
        .catch((error) =>
          console.log("Got an error in amend initialize ", error)
        );
    }
  }

  render() {
    const { profile, lat, lng } = this.state;

    return (
      <div className="containerCheckout" id="loc">
        <h2 className="pickup">Pick up location</h2>
        <p className="address">{profile.name}</p>
        <p className="desc">
          {profile.locationDescription} ({lat}, {lng})
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
    const timeoutId = setTimeout(() => {
      getCart().then(
        (response) => {
          const data = response.data;
          setCart(data);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  /* Allows the customer to change item quantities in their cart */
  const updateItemInCart = (
    itemId: string,
    countToSet: number,
    isRemoving?: boolean
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
                <p>
                  {item.quantity} x {item.itemId.name}
                </p>
              </div>
              <div className="number">
                <ButtonGroup size="small">
                  <Button
                    size="small"
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
                    size="small"
                    onClick={() => {
                      updateItemInCart(item._id, item.quantity + 1);
                    }}
                  >
                    {" "}
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </div>
              <p className="price">${toTwoDecimalPlaces(item.subtotal)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CheckoutButtonProps {
  vendorId: string;
  orderId: string;
}

/* If there is orderId in address, replace checkout button with update order button */
const CheckoutButton = ({ vendorId, orderId }: CheckoutButtonProps) => {


  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const promiseToWaitOn = orderId ? amendFinalize(orderId) : checkoutCart();
    promiseToWaitOn.then(
      (res) => {
        console.log("Response: ", res);
        history.push(`/cart/order/active`);
      },
      (err) => console.log("Got an error: ", err)
    );
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
          {orderId ? "Update Order" : "Place order"}
        </h3>
      </button>
    </div>
  );
};

const Checkout = () => {
  const { id: vendorId, orderId } = getId(true) || {};

  return (
    <div>
      <Header />
      <Vendor vendorId={vendorId} orderId={orderId} />
      <Information />
      <CheckoutButton vendorId={vendorId} orderId={orderId} />
    </div>
  );
};

export default Checkout;
