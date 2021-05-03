/* Import the required libraries and types */
import { hashSync } from "bcrypt";
import { Document, model, Model, Schema } from "mongoose";

/* Define the customer interface */
export interface ICustomer extends Document {
    email: string;
    givenName: string;
    familyName: string;
    password: string;
}

/* Define the customer schema */
const customerSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        set: (email: String) => email.toLowerCase()
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
        minlength: 6,
        set: (plaintext: String) => hashSync(plaintext, 10)
    }
});

/* Export the customer schema and model */
export { customerSchema }
const Customer: Model<ICustomer> = model("Customer", customerSchema);
export default Customer;
