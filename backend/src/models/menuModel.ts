/* Import the required libraries and types */
import { Document, Model, model, Schema } from "mongoose";
import { IMenuItem, menuItemSchema, IVendor } from "./index";

/* Define the menu interface */
export interface IMenu extends Document {
    vendorId: IVendor["_id"];
    items: Array<IMenuItem>;
}

/* Define the menu schema */
const menuSchema: Schema = new Schema({
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    items: {
        type: [menuItemSchema],
        required: true
    }
});

/* Export the menu schema and model */
export { menuSchema }
const Menu: Model<IMenu> = model("Menu", menuSchema);
export default Menu;
