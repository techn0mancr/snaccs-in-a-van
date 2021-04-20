/* Import the required libraries and types */
import { Router } from "express";

/* Set up the router */
const orderRouter: Router = Router();

/* Import the order controller */
import orderController = require("../controllers/orderController");

/* Handle order routes */
orderRouter.get("/:orderId/fulfill", orderController.fulfillOrder);

/* Export the router */
export default orderRouter;
