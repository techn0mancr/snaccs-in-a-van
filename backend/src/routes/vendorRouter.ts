/* Import the required libraries and types */
import { json, Router } from "express";

/* Set up the router */
const vendorRouter: Router = Router();
const jsonParser = json();

/* Import the vendor controllers and middlewares */
import * as controller from "../controllers/vendorController";
import * as middleware from "../middlewares/vendorMiddleware";

/* Use middlewares on the router */
vendorRouter.use(jsonParser);

/* Handle vendor routes at /api/vendor/... */
vendorRouter.patch("/login", controller.login);
vendorRouter.patch("/logout", middleware.authenticate, controller.logout);
vendorRouter.get("/nearest/:geolocation", controller.getNearestOpenVendors);
vendorRouter.get("/profile", middleware.authenticate, controller.getProfile);
vendorRouter.patch("/order/:orderId/fulfill", middleware.authenticate, controller.fulfillOrder);
vendorRouter.patch("/order/:orderId/complete", middleware.authenticate, controller.completeOrder);
vendorRouter.get("/orders/placed", middleware.authenticate, controller.getPlacedOrders);
vendorRouter.get("/orders/fulfilled", middleware.authenticate, controller.getFulfilledOrders);
vendorRouter.get("/orders/completed", middleware.authenticate, controller.getCompletedOrders);
vendorRouter.patch("/location/update/coordinates", middleware.authenticate, controller.setVendorGeolocation);
vendorRouter.patch("/location/update/description", middleware.authenticate, controller.setVendorLocationDescription);
vendorRouter.patch("/status/toggle", middleware.authenticate, controller.toggleVendorAvailability);

/* Export the router */
export default vendorRouter;
