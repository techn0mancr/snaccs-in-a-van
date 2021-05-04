/* Import the required libraries and types */
import { Router } from "express";

/* Set up the router */
const orderRouter: Router = Router();

/* Import the order controller */
import * as controller from "../controllers/orderController";

/* Handle order routes */
orderRouter.get("/:orderId", controller.getOrderDetails);
orderRouter.get("/:orderId/fulfill", controller.fulfillOrder);

/* Export the router */
export default orderRouter;
