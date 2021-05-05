import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { addItemToCart, getItemDetails } from "../api";
import displayImage from "../components/displayImage";

export default function ItemCounter() {
  const [itemCount, setItemCount] = useState(1);

  const items = [
    {
      // Change values import from mongodb
      emoji: "🍦",
      name: "ice cream",
      price: 5,
      id: "607073f83ed89dee65af788d"
    },
  ];

  function add(item: any, quantity: number) {
    debugger;
    // calls api to add item to cart
    addItemToCart(item, quantity);
    debugger;
    const promise = getItemDetails("607073f83ed89dee65af788d");
    debugger;
    const dataPromise = promise.then((response) => response.data);
    debugger;
  }

  return (
    <div style={{ display: "block", padding: 30 }}>
      {items.map((item) => (
        <div key={item.name}>
          <div className="item">
            <span role="img" aria-label={item.name}>
              {item.emoji}
            </span>
          </div>
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
          <button onClick={() => add(item, itemCount)}>Add</button>
        </div>
      ))}
    </div>
  );
}
