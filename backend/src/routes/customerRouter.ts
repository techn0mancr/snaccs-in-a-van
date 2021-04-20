/* Import the required libraries and types */
import { json, Router } from "express";

/* Set up the router */
const customerRouter: Router = Router();
const jsonParser = json();

/* Import the customer controller */
import * as controller from "../controllers/customerController";

/* Handle customer routes */
customerRouter.post("/order/add/:snackId", jsonParser, controller.addSnackToOrder);

/* Export the router */
export default customerRouter;
