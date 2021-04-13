/* Import required libraries and types */
import express from "express";
import { Router } from "express";

/* Set up server app */
const app = express();
const port: number = +(process.env.PORT || 3000);

/* Register routes */
import routes from "./routes";
app.use("/", routes);

/* Listen for incoming connections */
app.listen(port, () => {
    console.log("Backend listening on port " + port);
});
