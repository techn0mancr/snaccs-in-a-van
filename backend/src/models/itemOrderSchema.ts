/* Import the required libraries and types */
import { Document, Schema } from "mongoose";

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

/* Export the item order schema */
export default itemOrderSchema;
