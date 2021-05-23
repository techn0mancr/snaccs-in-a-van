/* Import the required libraries and types */
import { json, Router } from "express";
import { authenticateVendor } from "../middlewares";

/* Set up the router */
const vendorRouter: Router = Router();
const jsonParser = json();

/* Import the vendor controller */
import * as controller from "../controllers/vendorController";

/* Use middlewares on the router */
vendorRouter.use(jsonParser);

/* Handle vendor routes at /api/vendor/... */
vendorRouter.patch("/login", controller.login);
vendorRouter.patch("/logout", authenticateVendor, controller.logout);
vendorRouter.get("/profile", authenticateVendor, controller.getProfile);
vendorRouter.patch("/order/:orderId/fulfill", authenticateVendor, controller.fulfillOrder);
vendorRouter.patch("/order/:orderId/complete", authenticateVendor, controller.completeOrder);
vendorRouter.get("/orders/placed", authenticateVendor, controller.getPlacedOrders);
vendorRouter.get("/orders/fulfilled", authenticateVendor, controller.getFulfilledOrders);
vendorRouter.get("/orders/completed", authenticateVendor, controller.getCompletedOrders);
vendorRouter.patch("/location/update/coordinates", authenticateVendor, controller.setVendorGeolocation);
vendorRouter.patch("/location/update/description", authenticateVendor, controller.setVendorLocationDescription);
vendorRouter.patch("/status/toggle", authenticateVendor, controller.toggleVendorAvailability);

/* Export the router */
export default vendorRouter;
