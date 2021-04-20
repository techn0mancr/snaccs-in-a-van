/* Import the required libraries and types */
import { json, Router } from "express";

/* Set up the router */
const vendorRouter: Router = Router();
const jsonParser = json();

/* Import the vendor controller functions */
import * as controller from "../controllers/vendorController";

/* Handle vendor routes */
vendorRouter.get("/:vendorId/orders", controller.getOutstandingOrders);
vendorRouter.post("/:vendorId/update/location", jsonParser, controller.setVendorLocation); // TODO: still doesn't work
vendorRouter.post("/:vendorId/update/status", jsonParser, controller.setVendorAvailability);

/* Export the router */
export default vendorRouter;
