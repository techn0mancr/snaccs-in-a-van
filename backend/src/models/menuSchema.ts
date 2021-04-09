/* Import the required libraries and types */
import { Schema } from "mongoose";
import { itemSchema } from "./itemModel";

/* Define the menu schema */
const menuSchema: Schema = new Schema({
    items: [itemSchema]
});

/* Export the menu schema */
export default menuSchema;
