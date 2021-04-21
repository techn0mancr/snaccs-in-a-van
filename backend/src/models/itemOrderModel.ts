/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";

/* Define the item order interface */
export interface IItemOrder extends Document {
    itemId: Schema.Types.ObjectId;
    quantity: number;
}

/* Define the item order schema */
const itemOrderSchema: Schema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    }
});

/* Export the item order schema and model */
export { itemOrderSchema }
const ItemOrder: Model<IItemOrder> = model("ItemOrder", itemOrderSchema);
export default ItemOrder;
