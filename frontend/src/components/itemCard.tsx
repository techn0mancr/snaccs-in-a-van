import "../css/menu.css";
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   details: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   content: {
//     flex: '1 0 auto',
//   },
//   cover: {
//     width: 151,
//   },
//   controls: {
//     display: 'flex',
//     alignItems: 'center',
//     paddingLeft: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//   },
//   playIcon: {
//     height: 38,
//     width: 38,
//   },
// }));

export default function itemCard() {
  // const classes = useStyles();
  // const theme = useTheme();

  return (
    <div className="menu">
      <h1>Drinks</h1>
      <div className="menu-card">
        {/* Image src */}
        <img
          src="https://source.unsplash.com/J-4ozdP9EQ0/88x82"
          className="card"
          alt="cappucino"
        />
        <div className="menu-container">
          {/* Add button */}
          <button type="button" className="menu-button">
            Add
          </button>
          {/* Item name */}
          <h2>Cappucino</h2>
          {/* Item Price */}
          <h3>$8.00</h3>
        </div>
      </div>
    </div>
  );
}
