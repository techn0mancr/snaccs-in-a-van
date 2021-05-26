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

interface AddToCartProps {
  open: boolean;
  id: string;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

export default function AddToCart({ id, open, handleClose }: AddToCartProps) {

  const [itemCount, setItemCount] = useState(1);
  const [item, setItem] = useState({
    data: "",
    name: "",
    price: 0,
    mimetype: "",
  });

  const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

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
        alert("Please login");
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
              <button
                type="button"
                className="cart-button"
                onClick={() => add(id, itemCount)}
              >
                Add to Cart
              </button>
              <h2 className="cart-h2">{item.name}</h2>
              <br></br>
              <h3 className="cart-h3">
                ${toTwoDecimalPlaces(item.price * itemCount)}
              </h3>
              <div className="number">
                <ButtonGroup>
                  <Button
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
                    onClick={() => {
                      setItemCount(itemCount + 1);
                    }}
                  >
                    {" "}
                    <AddIcon fontSize="small" />
                  </Button>
                  {/* <Badge color="secondary" badgeContent={itemCount}></Badge> */}
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
