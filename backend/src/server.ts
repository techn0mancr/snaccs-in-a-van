/* Import required libraries and types */
import express from "express";
import { Router } from "express";

/* Connect to the database */
require("./models");

/* Set up server app */
const app = express();
const port: number = +(process.env.PORT || 3000);

/* Register routes */
import routes from "./routes";
app.use("/api", routes);

/* Listen for incoming connections */
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});
