import React, { useEffect, useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { addItemToCart, getItemDetails } from "../api";
import "../css/addToCart.css";

export default function ItemCounter() {
  const itemID = "607073f83ed89dee65af788d";
  const [itemCount, setItemCount] = useState(1);
  const [getItem, setItem] = useState({
    data: "",
    name: "",
    price: 0,
    id: "",
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
    getItemDetails(itemID).then((response) => {
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
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Snacks In a Van</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="addToCart.css" />
      </head>

      <body>
        <div className="fixed-bottom add-card">
          <h1>Add to Cart?</h1>
          <img
            id="base64image"
            src={`data:${getItem.mimetype};base64,${getItem.data}`}
            className="card"
            alt={getItem.name}
          />
          <div className="add-container">
            <button
              type="button"
              className="cart-button"
              onClick={() => add(itemID, itemCount)}
            >
              Add to Cart
            </button>
            <h2>{getItem.name}</h2>
            <h3>${toTwoDecimalPlaces(getItem.price)}</h3>
            <div className="number">
              <Badge color="secondary" badgeContent={itemCount}>
                <ShoppingCartIcon />{" "}
              </Badge>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    setItemCount(Math.max(itemCount - 1, 0));
                  }}
                >
                  {" "}
                  {/* Minus Icon */}
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  onClick={() => {
                    setItemCount(itemCount + 1);
                  }}
                >
                  {" "}
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div></div>
        </div>
      </body>
    </>
  );
}
