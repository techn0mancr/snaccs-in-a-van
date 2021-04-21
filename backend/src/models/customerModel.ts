/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";
import { IToken, IItemOrder, itemOrderSchema, tokenSchema } from "./index";

/* Define the customer interface */
export interface ICustomer extends Document {
    email: string;
    givenName: string;
    familyName: string;
    password: string;
    cart: Array<IItemOrder>;
    tokens: Array<IToken>;
}

/* Define the customer schema */
const customerSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    givenName: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cart: {
        type: [itemOrderSchema],
        default: []
    },
    tokens: {
        type: [tokenSchema]
    }
});

/* Export the customer schema and model */
export { customerSchema }
const Customer: Model<ICustomer> = model("Customer", customerSchema);
export default Customer;
