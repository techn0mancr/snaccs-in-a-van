/* Import the required libraries and types */
import { hashSync } from "bcrypt";
import { Document, model, Model, Schema } from "mongoose";

/* Define the vendor interface */
export interface IVendor extends Document {
    email: string;
    name: string;
    password: string;
    locationDescription: string;
    isOpen: boolean;
    geolocation: Array<number>;
}

/* Define the vendor schema */
const vendorSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        set: (email: string) => email.toLowerCase()
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        set: (plaintext: string) => hashSync(plaintext, 10)
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
    }
});

/* Export the vendor schema and model */
export { vendorSchema }
const Vendor: Model<IVendor> = model("Vendor", vendorSchema);
export default Vendor;
