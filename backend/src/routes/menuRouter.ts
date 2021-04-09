/* Import the required libraries and types */
import { Router } from "express";

/* Set up the router */
const menuRouter: Router = Router();

/* Import the customer controller */
import menuController = require("../controllers/menuController");

/* Handle menu routes */
menuRouter.get("/:vendorID", menuController.getMenu);
menuRouter.get("/item/:itemID", menuController.getItemDetails);

/* Export the router */
export default menuRouter;
