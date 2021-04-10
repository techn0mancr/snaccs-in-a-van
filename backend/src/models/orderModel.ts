/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";
import { IItem, itemSchema } from "./itemModel";

/* Define the order interface */
export interface IOrder extends Document {
    items: Array<IItem>;
    total: number;
    timestamp: Date;
}

/* Define the order schema */
const orderSchema: Schema = new Schema({
    items: {
        type: [itemSchema],
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    timestamp: {
        type: Date,
        required: true
    }
});

/* Export the order model */
const Order: Model<IOrder> = model("Order", orderSchema);
export default Order;
