/* Import the required libraries and types */
import { Document, model, Model, Schema } from "mongoose";
import { IToken, IOrder, orderSchema, tokenSchema } from "./index";

/* Define the customer interface */
export interface ICustomer extends Document {
    email: string;
    givenName: string;
    familyName: string;
    password: string;
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
    tokens: {
        type: [tokenSchema]
    }
});

/* Export the customer schema and model */
export { customerSchema }
const Customer: Model<ICustomer> = model("Customer", customerSchema);
export default Customer;
