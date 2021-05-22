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
// vendorRouter.get("/orders/outstanding", vendorAuth, controller.getOutstandingOrders);

vendorRouter.get("/profile", vendorAuth, controller.getProfile);
vendorRouter.patch("/order/:orderId/complete", vendorAuth, controller.completeOrder);
vendorRouter.get("/orders/placed", vendorAuth, controller.getPlacedOrders);
vendorRouter.get("/orders/fulfilled", vendorAuth, controller.getFulfilledOrders);
vendorRouter.get("/orders/completed", vendorAuth, controller.getCompletedOrders);
vendorRouter.patch("/location/update/coordinates", vendorAuth, controller.setVendorGeolocation);
vendorRouter.patch("/location/update/description", vendorAuth, controller.setVendorLocationDescription);
vendorRouter.patch("/status/toggle", vendorAuth, controller.toggleVendorAvailability);

/* Export the router */
export default vendorRouter;
