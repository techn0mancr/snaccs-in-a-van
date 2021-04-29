/* Import the required libraries and types */
import { json, Router } from "express";

/* Set up the router */
const customerRouter: Router = Router();
const jsonParser = json();

/* Import the customer controller */
import * as controller from "../controllers/customerController";

/* Use middlewares on the router */
customerRouter.use(jsonParser);

/* Handle customer routes */
customerRouter.post("/order/add/:itemId", controller.addSnackToCart);
customerRouter.post("/login", controller.login);
customerRouter.post("/register", controller.register);

/* Export the router */
export default customerRouter;
