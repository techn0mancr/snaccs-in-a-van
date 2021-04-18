/* Import the required libraries and types */
import { Router } from "express";
import { Vendor } from "models";

/* Set up the router */
const vendorRouter: Router = Router();

/* Import the customer controller */
import vendorController = require("../controllers/vendorController");

/* Handle vendor routes */
vendorRouter.post("/:vanID/setStatus", vendorController.setVendorAvailability);
vendorRouter.get("/:vendorId/orders", vendorController.getOutstandingOrders);
vendorRouter.get("/:vanID/order/:orderID/update", vendorController.fulfilOrder);
vendorRouter.get("/:vendorId/customlocation", vendorController.setVendorCustomLocation);
// vendorRouter.get("/:vendorId/login", vendorController.getVendorLogin);

/* Export the router */
export default vendorRouter;
