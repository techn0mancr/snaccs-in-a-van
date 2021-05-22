/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";

/* Define the order rating interface */
export interface IOrderTimestamps extends Document {
    placed: Date;
    fulfilled: Date;
    completed: Date;
}

/* Define the order rating schema */
const orderTimestampsSchema: Schema = new Schema({
    placed: {
        type: Date,
        default: Date.now
    },
    fulfilled: {
        type: Date,
        default: undefined
    },
    completed: {
        type: Date,
        default: undefined
    }
});

/* Export the order rating schema and model */
export { orderTimestampsSchema }
const OrderTimestamps: Model<IOrderTimestamps> = model("OrderTimestamps", orderTimestampsSchema);
export default OrderTimestamps;
