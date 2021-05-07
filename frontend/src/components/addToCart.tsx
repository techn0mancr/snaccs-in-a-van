import React, { useEffect, useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Back from "./back";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import leftArrow from "../img/leftArrow.png"
import { addItemToCart, getItemDetails } from "../api";
import "../css/addToCart.css";
import history from '../history';

export default function AddToCart() {
  // const itemID = "607073f83ed89dee65af788d";

  const [itemCount, setItemCount] = useState(1);
  const [getItem, setItem] = useState({
    data: "",
    name: "",
    price: 0,
    id: "",
    mimetype: "",
  });
  const [itemID, setItemID] = useState(String);

  const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  function getId() {
    const query = history.location.search
    const id = query.replace('?id=','')
    return id;
  }

  function toTwoDecimalPlaces(number: number) {
    return number.toLocaleString(undefined, currencyOptions);
  }

  // Sends a GET request with itemID as parameter and initialises the state of item
  useEffect(() => {
    const itemID = getId();
    setItemID(itemID);
    getItemDetails(itemID).then((response: { data: any }) => {
      console.log("item details: ", response);
      var test = response.data;
      console.log(test);
      setItem({
        data: test.data,
        name: test.name,
        price: test.price,
        id: test._id,
        mimetype: test.mimetype,
      });
    });
  }, []);

  // Sends a POST request to the API of a specified itemID and quantity
  function add(itemID: string, quantity: number) {
    // calls api to add item to cart
    addItemToCart(itemID, quantity).then(
      (response) => {
        console.log("success", response);
        history.goBack();
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  return (
    <div>
        <div className="fixed-top add-card">
          <h1 className="cart-h1">Add to Cart</h1>
          <img
            className="cart-img card"
            id="base64image"
            src={`data:${getItem.mimetype};base64,${getItem.data}`}
            alt={getItem.name}
          />

          <div className="add-container">
            <button type="button" className="cart-button" onClick={() => add(itemID, itemCount)}>
              Add to Cart
            </button>
            <h2 className="cart-h2">{getItem.name}</h2>
            <br></br>
            <h3 className="cart-h3">${toTwoDecimalPlaces(getItem.price)}</h3>
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
        <input type="image" alt="back" className="back" src={leftArrow} onClick={()=> history.goBack()}/>
    </div>
  );
}
