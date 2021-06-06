/* Import the required libraries and types */
import { useEffect, useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Dialog from "@material-ui/core/Dialog";
import { addItemToCart, getItemDetails } from "../api";
import "../css/addToCart.css";
import history from "../history";
import { customerProfile } from "../api";

/* States and variables to handle popover/modal for addToCart item */
interface AddToCartProps {
  open: boolean;
  id: string;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  setCartEmpty: (isEmpty: boolean) => void;
}

export default function AddToCart({
  id,
  open,
  handleClose,
  setCartEmpty,
}: AddToCartProps) {
  const [itemCount, setItemCount] = useState(1);
  const [item, setItem] = useState({
    data: "",
    name: "",
    price: 0,
    mimetype: "",
  });

  /* Put currency option */
  const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  /* Return number into 2 decimal places */
  function toTwoDecimalPlaces(number: number) {
    return number.toLocaleString(undefined, currencyOptions);
  }

  // Sends a GET request with itemID as parameter and initialises the state of item
  useEffect(() => {
    customerProfile().then(
      (response) => {
        console.log(response);
      },
      (error) => {
        history.push("/customer/login");
        console.log(error);
      }
    );
    getItemDetails(id).then((response: { data: any }) => {
      console.log("item details: ", response);
      var res = response.data;
      console.log(res);
      setItem({
        ...res,
        id: res._id,
      });
    });
  });

  // Sends a POST request to the API of a specified itemID and quantity
  function add(itemID: string, quantity: number) {
    // calls api to add item to cart
    addItemToCart(itemID, quantity).then(
      (response) => {
        console.log("success", response);
        alert(`Added ${quantity}x ${item.name}`);
        handleClose({}, "backdropClick");
        setCartEmpty(false);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <div>
          <div className="fixed-top add-card">
            <h1 className="cart-h1">Add to Cart</h1>
            <img
              className="cart-img card"
              id="base64image"
              src={`data:${item.mimetype};base64,${item.data}`}
              alt={item.name}
            />

            <div className="add-container">
              <h2 className="cart-h2">{item.name}</h2>
              <br></br>
              <h3 className="cart-h3">
                ${toTwoDecimalPlaces(item.price * itemCount)}
              </h3>
              <div className="number">
                <ButtonGroup size="small">
                  <Button
                    size="small"
                    onClick={() => {
                      setItemCount(Math.max(itemCount - 1, 0));
                    }}
                  >
                    {" "}
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <input
                    className="quantity-input__screen"
                    type="text"
                    value={itemCount}
                    readOnly
                  />
                  <Button
                    size="small"
                    onClick={() => {
                      setItemCount(itemCount + 1);
                    }}
                  >
                    {" "}
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
                <button
                  type="button"
                  className="cart-button"
                  onClick={() => add(id, itemCount)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
