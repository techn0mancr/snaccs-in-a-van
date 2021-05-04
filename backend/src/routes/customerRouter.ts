/* Import the required libraries and types */
import { json, Router } from "express";
import { customerAuth } from "../middlewares/authMiddleware";

/* Set up the router */
const customerRouter: Router = Router();
const jsonParser = json();

/* Import the customer controller */
import * as controller from "../controllers/customerController";

/* Use middlewares on the router */
customerRouter.use(jsonParser);

/* Handle customer routes */
customerRouter.get("/cart", controller.getCart);
customerRouter.post("/cart/add/:itemId", controller.addItemToCart);
customerRouter.get("/cart/checkout", customerAuth, controller.checkoutCart);
customerRouter.get("/cart/clear", controller.emptyCart);
customerRouter.get("/orders/active", customerAuth, controller.getActiveOrders);
customerRouter.get("/orders/past", customerAuth, controller.getPastOrders);
customerRouter.post("/login", controller.login);
customerRouter.get("/logout", customerAuth, controller.logout);
customerRouter.get("/profile", customerAuth, controller.getProfile);
customerRouter.post("/register", controller.register);

/* Export the router */
export default customerRouter;
