/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";
import { IItemOrder } from "./itemOrderSchema";
import itemOrderSchema from "./itemOrderSchema";

/* Define the order status enum */
enum OrderStatus {
    Placed = "Placed",
    Fulfilled = "Fulfilled",
    Completed = "Completed"
}

/* Define the order interface */
export interface IOrder extends Document {
    status: OrderStatus;
    items: Array<IItemOrder>;
    total: number;
    orderTimestamp: Date;
    fulfilledTimestamp: Date;
    isChanged: boolean;
    isCancelled: boolean;
    rating: number;
}

/* Define the order schema */
const orderSchema: Schema = new Schema({
    status: {
        type: String,
        default: "",
        required: true
    },
    items: {
        type: [itemOrderSchema],
        default: [],
        required: true
    },
    total: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    orderTimestamp: {
        type: Date,
        default: Date.now
    },
    fulfilledTimestamp: {
        type: Date,
        default: null
    },
    isChanged: {
        type: Boolean,
        default: false
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

/* Export the order model */
const Order: Model<IOrder> = model("Order", orderSchema);
export default Order;
