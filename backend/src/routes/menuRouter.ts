/* Import the required libraries and types */
import { Router } from "express";

/* Set up the router */
const menuRouter: Router = Router();

/* Import the menu controller */
import * as controller from "../controllers/menuController";

/* Handle menu routes */
menuRouter.get("/:vendorId", controller.getMenu);
menuRouter.get("/item/:itemId", controller.getItemDetails);

/* Export the router */
export default menuRouter;
