/* Import the required libraries and types */
import connectMongoDBSession from "connect-mongodb-session"
import express from "express";
import { Router } from "express";
import session from "express-session";
import timestring from "timestring";

/* Import the required constants */
import { MONGODB_CONNECTION_STRING, MONGODB_DATABASE_NAME, SESSIONS_COLLECTION_NAME } from "./config";
import { SESSIONS_SECRET } from "./secrets";

/* Connect to the database */
require("./models");

/* Set up server app */
const app = express();
const port: number = +(process.env.PORT || 48080);

/* Register routes */
import routes from "./routes";
app.use("/api", routes);

/* Set up sessions */
const MongoDBStore = connectMongoDBSession(session);
app.use(session({
    secret: SESSIONS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoDBStore({
        uri: MONGODB_CONNECTION_STRING,
        databaseName: MONGODB_DATABASE_NAME,
        collection: SESSIONS_COLLECTION_NAME
    }),
    cookie: {
        maxAge: timestring("1d", "ms"),
        secure: false
    }
}));

/* Listen for incoming connections */
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});
