/* Import the required libraries and types */
import { Document, model, Model, Mongoose, Schema } from "mongoose";

/* Define the item order interface */
export interface IItemOrder extends Document {
  menuItem: Schema.Types.ObjectId;
  quantity: number;
}

/* Define the item order schema */
const orderItemSchema: Schema = new Schema({
  menuItem: {
    type: Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
});

const OrderItem: Model<IItemOrder> = model("OrderItem", orderItemSchema);

export default OrderItem;
