/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";

/* Define the order status enum */
export const enum OrderStatus {
    Placed = "Placed",
    Fulfilled = "Fulfilled",
    Completed = "Completed"
}

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

/* Define the order interface */
export interface IOrder extends Document {
    status: string;
    items: Array<IItemOrder>;
    total: number;
    orderTimestamp: Date;
    isFulfilled: boolean;
    fulfilledTimestamp: Date;
    isChanged: boolean;
    isCancelled: boolean;
    rating: number;
}

/* Define the order schema */
const orderSchema: Schema = new Schema({
    vendorId: {                     //Jeffrey : Added vendorId so vendor can have vendor-specific orders
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    status: {
        type: String,          //Jeffrey : Added OrderStatus instead of string to access Enums
        required: true
    },
    items: {
        type: [itemOrderSchema],
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    orderTimestamp: {
        type: Date,
        default: Date.now
    },
    isFulfilled: {               //Jeffrey : Added isFulfilled so vendor can set isFulfilled when order is ready
        type: Boolean,
        default: false
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
