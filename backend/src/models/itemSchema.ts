/* Import the required libraries and types */
import { Schema } from "mongoose";

/* Define the item schema */
const itemSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    mimetype: {
        type: String
    }, // file type
    size: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    data: {
        type: String
    } // image converted to base64
});

/* Export the item schema */
export default itemSchema;
