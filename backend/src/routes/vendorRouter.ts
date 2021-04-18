/* Import the required libraries and types */
import { Router } from "express";

/* Set up the router */
const vendorRouter: Router = Router();

/* Import the customer controller */
import vendorController = require("../controllers/vendorController");

/* Handle vendor routes */
// vendorRouter.post("/:vanID/setStatus");
vendorRouter.get("/:vendorId/orders", vendorController.getOutstandingOrders);
// vendorRouter.get("/:vanID/order/:orderID/update");
vendorRouter.get("/:vendorId/customlocation", vendorController.setVendorCustomLocation);

/* Export the router */
export default vendorRouter;
