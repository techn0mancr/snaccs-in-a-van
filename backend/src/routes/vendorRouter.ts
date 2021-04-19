/* Import the required libraries and types */
import { Router } from "express";
import { Vendor } from "models";

/* Set up the router */
const vendorRouter: Router = Router();

/* Import the customer controller */
import vendorController = require("../controllers/vendorController");

/* Handle vendor routes */
vendorRouter.post("/:vendorId/update/status", vendorController.setVendorAvailability);
vendorRouter.get("/:vendorId/orders", vendorController.getOutstandingOrders);
vendorRouter.post("/:vendorId/order/:orderID/fulfill", vendorController.fulfillOrder);
vendorRouter.get("/:vendorId/update/location", vendorController.setVendorCustomLocation);
// vendorRouter.get("/:vendorId/login", vendorController.getVendorLogin);

/* Export the router */
export default vendorRouter;
