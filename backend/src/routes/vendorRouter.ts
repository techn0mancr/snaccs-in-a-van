/* Import the required libraries and types */
import { json, Router } from "express";

/* Set up the router */
const vendorRouter: Router = Router();
const jsonParser = json();

/* Import the vendor controller */
import vendorController = require("../controllers/vendorController");

/* Handle vendor routes */
// vendorRouter.post("/:vendorId/login", jsonParser, vendorController.getVendorLogin);
vendorRouter.get("/:vendorId/orders", vendorController.getOutstandingOrders);
vendorRouter.post("/:vendorId/update/location", jsonParser, vendorController.setVendorLocation); // TODO: still doesn't work
vendorRouter.post("/:vendorId/update/status", jsonParser, vendorController.setVendorAvailability);

/* Export the router */
export default vendorRouter;
