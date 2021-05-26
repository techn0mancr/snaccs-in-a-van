/* Import the required libraries and types */
import { json, Router } from "express";

/* Set up the router */
const customerRouter: Router = Router();
const jsonParser = json();

/* Import the customer controllers and middlewares */
import * as controller from "../controllers/customerController";
import * as middleware from "../middlewares/customerMiddleware";

/* Use middlewares on the router */
customerRouter.use(jsonParser);

/* Handle customer routes at /api/customer/... */
customerRouter.get("/cart", controller.getCart);
customerRouter.post("/cart/checkout", middleware.authenticate, controller.checkoutCart);
customerRouter.patch("/cart/edit/:itemId", controller.editCartItem);
customerRouter.patch("/cart/empty", controller.emptyCart);
customerRouter.patch("/order/:orderId/amend/cancel", middleware.authenticate, controller.cancelOrderAmendment);
customerRouter.patch("/order/:orderId/amend/finalize", middleware.authenticate, controller.finalizeOrderAmendment);
customerRouter.patch("/order/:orderId/amend/initialize", middleware.authenticate, controller.initializeOrderAmendment);
customerRouter.patch("/order/:orderId/cancel", middleware.authenticate, controller.cancelOrder);
customerRouter.patch("/order/:orderId/rate", middleware.authenticate, controller.rateOrder);
customerRouter.get("/orders/active", middleware.authenticate, controller.getActiveOrders);
customerRouter.get("/orders/past", middleware.authenticate, controller.getPastOrders);
customerRouter.patch("/login", controller.login);
customerRouter.patch("/logout", middleware.authenticate, controller.logout);
customerRouter.get("/profile", middleware.authenticate, controller.getProfile);
customerRouter.patch("/profile/amend", middleware.authenticate, controller.amendProfileDetails);
customerRouter.post("/register", controller.register);
customerRouter.patch("/vendor/:vendorId/select", controller.selectVendor);

/* Export the router */
export default customerRouter;
