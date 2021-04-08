/* Import the required libraries and types */
import {Schema} from "mongoose";
import itemSchema = require("./item");

/* Define the menu schema */
const menuSchema = Schema({
    items: [itemSchema]
});

/* Export the menu schema */
modules.exports = menuSchema;
