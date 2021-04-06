/* Import the required libraries and types */
import {Router} from "express";

/* Set up the router */
const vendorRouter: Router = Router();

/* Import the customer controller */
import vendorController = require("../controllers/vendorController");

/* Handle vendor routes */
vendorRouter.post("/:vanID/setStatus");
vendorRouter.get("/:vanID/orders");
vendorRouter.get("/:vanID/order/:orderID/update");

/* Export the router */
module.exports = vendorRouter;
