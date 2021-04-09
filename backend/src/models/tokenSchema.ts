/* Import the required libraries and types */
import { Document, Schema } from "mongoose";

/* Define the token interface */
export interface IToken extends Document {
    token: String
}

/* Define the token schema  */
const tokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true
    }
});

export default tokenSchema;
