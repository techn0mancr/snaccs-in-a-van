/* Import required libraries and types */
import express = require("express");
import {Router} from "express";

/* Set up server app */
const app = express();
const port: number = +(process.env.PORT || 3000);

/* Set up routes */
const customerRouter: Router = require("./routes/customerRouter");
const menuRouter: Router = require("./routes/menuRouter");
const vendorRouter: Router = require("./routes/vendorRouter");

/* Handle route requests */
app.use("/customer", customerRouter);
app.use("/menu", menuRouter);
app.use("/vendor", vendorRouter);

/* Listen for incoming connections */
app.listen(port, () => {
    console.log("Backend listening on port " + port);
});
