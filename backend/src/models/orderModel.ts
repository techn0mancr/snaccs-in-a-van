/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";
import {
    ICustomer,
    IItemOrder, itemOrderSchema,
    IOrderRating,
    IOrderTimestamps,
    IVendor
} from "./index";

/* Don't know why but these have to be imported directly for the subdocuments to work */
import { orderRatingSchema } from "./orderRatingModel";
import { orderTimestampsSchema } from "./orderTimestampsModel";

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
    timestamps: IOrderTimestamps;
    isChanged: boolean;
    rating: IOrderRating;
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
    timestamps: {
        type: orderTimestampsSchema,
        default: {}
    },
    isChanged: {
        type: Boolean,
        default: false
    },
    rating: {
        type: orderRatingSchema,
        default: undefined
    }
});

/* Export the order schema, model and status enum */
export { orderSchema, OrderStatus }
const Order: Model<IOrder> = model("Order", orderSchema);
export default Order;
