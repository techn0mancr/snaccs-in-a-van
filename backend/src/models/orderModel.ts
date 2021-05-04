/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";
import { ICustomer, IItemOrder, itemOrderSchema, IVendor } from "./index";

/* Define order status enum */
enum OrderStatus {
    Placed = "Placed",
    Fulfilled = "Fulfilled",
    Completed = "Completed",
    Cancelled = "Cancelled"
}

/* Define the order interface */
export interface IOrder extends Document {
    customerId: ICustomer["_id"];
    vendorId: IVendor["_id"];
    status: string;
    items: Array<IItemOrder>;
    total: number;
    placedTimestamp: Date;
    fulfilledTimestamp: Date;
    completedTimestamp: Date;
    isChanged: boolean;
    rating: number;
}

/* Define the order schema */
const orderSchema: Schema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    status: {
        type: String,
        default: OrderStatus.Placed,
        required: true
    },
    items: {
        type: [itemOrderSchema],
        required: true
    },
    total: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    placedTimestamp: {
        type: Date,
        default: Date.now
    },
    fulfilledTimestamp: {
        type: Date,
        default: undefined
    },
    completedTimestamp: {
        type: Date,
        default: undefined
    },
    isChanged: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

/* Export the order schema, model and status enum */
export { orderSchema, OrderStatus }
const Order: Model<IOrder> = model("Order", orderSchema);
export default Order;
