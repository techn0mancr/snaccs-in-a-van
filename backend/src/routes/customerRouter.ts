/* Import the required libraries and types */
import { json } from "body-parser";
import { Router } from "express";

/* Set up the router */
const customerRouter: Router = Router();
const jsonParser = json();

/* Import the customer controller */
import customerController = require("../controllers/customerController");

/* Handle customer routes */
customerRouter.post("/order/add/:snackID", jsonParser, customerController.addSnackToOrder);

/* Export the router */
export default customerRouter;
