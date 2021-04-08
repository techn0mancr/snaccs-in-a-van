/* Import the required libraries and types */
import {connect} from "mongoose";

/* Initialize the connection details */
const connectionString = "";
const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true;
};

/* Connect to the database */
connect(connectionString, connectionOptions).then(
    () => {
        console.log("Successfully connected to database!");
    },
    (err) => {
        console.log("Database connection has failed!");
    }
);

/* Load database models */
require("./customer");
