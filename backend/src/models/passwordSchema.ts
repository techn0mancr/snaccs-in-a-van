/* Import the required libraries and types */
import passwordValidator from "password-validator";
import {
    PASSWORD_MIN_DIGITS,
    PASSWORD_MIN_LEN,
    PASSWORD_MIN_LETTERS
} from "../config";

/* Initialize the password schema */
const passwordSchema = new passwordValidator();

/* Add properties to the password schema */
passwordSchema
.has().letters(PASSWORD_MIN_LETTERS)
.has().digits(PASSWORD_MIN_DIGITS)
.is().min(PASSWORD_MIN_LEN)

/* Export the password schema */
export default passwordSchema;
