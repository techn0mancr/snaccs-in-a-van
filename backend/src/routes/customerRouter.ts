/* Import the required libraries and types */
import { json, Router } from "express";
import { authenticateCustomer } from "../middlewares";

/* Set up the router */
const customerRouter: Router = Router();
const jsonParser = json();

/* Import the customer controller */
import * as controller from "../controllers/customerController";

/* Use middlewares on the router */
customerRouter.use(jsonParser);

/* Handle customer routes at /api/customer/... */
customerRouter.get("/cart", controller.getCart);
customerRouter.patch("/cart/add/:itemId", controller.addItemToCart);
customerRouter.post("/cart/checkout", authenticateCustomer, controller.checkoutCart);
customerRouter.patch("/cart/empty", controller.emptyCart);
customerRouter.patch("/order/:orderId/amend/cancel", authenticateCustomer, controller.cancelOrderAmendment);
customerRouter.patch("/order/:orderId/amend/finalize", authenticateCustomer, controller.finalizeOrderAmendment);
customerRouter.patch("/order/:orderId/amend/initialize", authenticateCustomer, controller.initializeOrderAmendment);
customerRouter.patch("/order/:orderId/cancel", authenticateCustomer, controller.cancelOrder);
customerRouter.patch("/order/:orderId/rate", authenticateCustomer, controller.rateOrder);
customerRouter.get("/orders/active", authenticateCustomer, controller.getActiveOrders);
customerRouter.get("/orders/past", authenticateCustomer, controller.getPastOrders);
customerRouter.patch("/login", controller.login);
customerRouter.patch("/logout", authenticateCustomer, controller.logout);
customerRouter.get("/profile", authenticateCustomer, controller.getProfile);
customerRouter.patch("/profile/amend", authenticateCustomer, controller.amendProfileDetails);
customerRouter.post("/register", controller.register);
customerRouter.patch("/vendor/:vendorId/select", controller.selectVendor);

/* Export the router */
export default customerRouter;
