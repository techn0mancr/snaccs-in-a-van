/* Import the required libraries and types */
import { Document, Model, model, Schema } from "mongoose";
import { IItem, itemSchema } from "./itemModel";

/* Define the menu interface */
export interface IMenu extends Document {
    items: Array<IItem>;
}

/* Define the menu schema */
const menuSchema: Schema = new Schema({
    items: {
        type: [itemSchema],
        required: true
    }
});

/* Export the menu model */
const Menu: Model<IMenu> = model("Menu", menuSchema);
export default Menu;
