/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";
import { IItem } from "./index";

/* Define the menu item interface */
export interface IMenuItem extends Document {
    itemId: IItem["_id"];
}

/* Define the menu item schema */
const menuItemSchema: Schema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true
    }
});

/* Export the menu item schema and model */
export { menuItemSchema }
const MenuItem: Model<IMenuItem> = model("MenuItem", menuItemSchema);
export default MenuItem;
