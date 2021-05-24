/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";

/* Define the order rating interface */
export interface IOrderRating extends Document {
    overall: number;
    comments: string;
}

/* Define the order rating schema */
const orderRatingSchema: Schema = new Schema({
    overall: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comments: {
        type: String,
        default: undefined
    }
});

/* Export the order rating schema and model */
export { orderRatingSchema }
const OrderRating: Model<IOrderRating> = model("OrderRating", orderRatingSchema);
export default OrderRating;
