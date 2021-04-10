/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";

/* Define the item interface */
export interface IItem extends Document {
    name: string;
    price: number;
    mimetype: string;
    size: number;
    data: string;
}

/* Define the item schema */
const itemSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mimetype: {
        type: String
    }, // file type
    size: {
        type: Number
    },
    data: {
        type: String
    } // image converted to base64
});

/* Export the item schema and model */
export { itemSchema };
const Item: Model<IItem> = model("Item", itemSchema);
export default Item;
