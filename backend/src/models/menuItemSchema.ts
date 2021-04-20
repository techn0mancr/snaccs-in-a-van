/* Import the required libraries and types */
import { Document, Schema } from "mongoose";

/* Define the menu item interface */
export interface IMenuItem extends Document {
    itemId: Schema.Types.ObjectId;
}

/* Define the menu item schema */
const menuItemSchema: Schema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true
    }
});

/* Export the menu item schema */
export default menuItemSchema;
