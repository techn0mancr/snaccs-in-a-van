/* Import the required libraries and types */
import { json, Router } from "express";

/* Set up the router */
const customerRouter: Router = Router();
const jsonParser = json();

/* Import the customer controller */
import * as controller from "../controllers/customerController";

/* Handle customer routes */
customerRouter.post("/order/add/:itemId", jsonParser, controller.addSnackToCart);
customerRouter.get("/orders/active", customerAuth, controller.getActiveOrders);
customerRouter.get("/orders/past", customerAuth, controller.getPastOrders);

/* Export the router */
export default customerRouter;
