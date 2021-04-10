/* Import the required libraries and types */
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Document, model, Model, Schema } from "mongoose";

/* Import the required interfaces and schemas */
import { IToken } from "./tokenSchema";
import tokenSchema from "./tokenSchema";

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

/* Hash password on change */
customerSchema.pre<ICustomer>("save", function(next: Function) {
    if (this.isModified("password"))
        this.password = hashSync(this.password, 8); // probably should remove that magic number
    next();
});

/* Generate auth tokens for the user */
//customerSchema.methods.generateAuthToken = async function(this: ICustomer) {
    //const newToken = sign({ _id: this._id }, "secret key"); // also need to put the secret key inside some secrets.ts
    
    //this.tokens = this.tokens.concat({ newToken });
    //await this.save();

    //return newToken;
//}

/* Export the customer model */
const Customer: Model<ICustomer> = model("Customer", customerSchema);
export default Customer;
