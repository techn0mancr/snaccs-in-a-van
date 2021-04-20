/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";

/* Import the required interfaces and schemas */
import { IToken } from "./tokenSchema";
import tokenSchema from "./tokenSchema";

/* Define the vendor interface */
interface IVendor extends Document {
    email: string;
    name: string;
    password: string;
    locationDescription: string;
    isOpen: boolean;
    geolocation: Array<number>;
    tokens: Array<IToken>;
}

/* Define the vendor schema */
const vendorSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    locationDescription: {
        type: String
    },
    isOpen: {
        type: Boolean,
        required: true
    },
    geolocation: {
        type: [Number],
        default: undefined
    },
    tokens: {
        type: [tokenSchema]
    }
});

/* Export the customer model */
const Vendor: Model<IVendor> = model("Vendor", vendorSchema);
export default Vendor;
