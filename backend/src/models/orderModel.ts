/* Import the required libraries and types */
import { Document, model, Model, ObjectId, Schema } from "mongoose";
import { IItemOrder } from "./itemOrderSchema";
import itemOrderSchema from "./itemOrderSchema";

/* Define order status enum */
enum OrderStatus {
    Placed = "Placed",
    Fulfilled = "Fulfilled",
    Completed = "Completed"
}

/* Define the order interface */
export interface IOrder extends Document {
    vendorId: ObjectId;
    status: string;
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
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
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
        default: undefined
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

/* Export the order model and status enum */
const Order: Model<IOrder> = model("Order", orderSchema);
export default Order;
export { OrderStatus };
