/* Import the required libraries and types */
import { json, Router } from "express";
import { vendorAuth } from "../middlewares/authMiddleware";

/* Set up the router */
const vendorRouter: Router = Router();
const jsonParser = json();

/* Import the vendor controller */
import * as controller from "../controllers/vendorController";

/* Use middlewares on the router */
vendorRouter.use(jsonParser);

/* Handle vendor routes at /api/vendor/... */
vendorRouter.patch("/login", controller.login);
vendorRouter.patch("/logout", vendorAuth, controller.logout);
vendorRouter.patch("/order/:orderId/fulfill", vendorAuth, controller.fulfillOrder);
vendorRouter.get("/orders/outstanding", vendorAuth, controller.getOutstandingOrders);
vendorRouter.patch("/update/location", vendorAuth, controller.setVendorLocation);
vendorRouter.patch("/update/status", vendorAuth, controller.setVendorAvailability);

/* Export the router */
export default vendorRouter;
