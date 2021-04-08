/* Import the required libraries and types */
import { Router } from "express";

/* Import existing routes */
import customerRouter from "./customerRouter";
import menuRouter from "./menuRouter";
import vendorRouter from "./vendorRouter";

/* Set up the unifying router */
const routes: Router = Router();

/* Register the existing routes */
routes.use("/customer", customerRouter);
routes.use("/menu", menuRouter);
routes.use("/vendor", vendorRouter);

/* Export the unifying router */
export default routes;
