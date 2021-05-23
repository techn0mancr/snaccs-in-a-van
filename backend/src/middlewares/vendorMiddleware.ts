/* Import the required libraries and types */
import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { Vendor } from "../models";

/* Authenticate a vendor based on their session data */
async function authenticate(req: Request, res: Response, next: NextFunction) {
    /* Check if the session data is characteristic of a vendor */
    if (!req.session.vendorId || req.session.customerId || req.session.cart) {
        res.status(401).send("Unauthorized");
        return;
    }
    
    /* Verify that the vendor exists */
    const existingVendor = await Vendor.findById(req.session.vendorId);
    if (!existingVendor) {
        res.status(401).send("Unauthorized");
        return;
    }
    
    /* Continue executing the route's controller */
    next();
}

/* Export the vendor middlewares */
export {
    authenticate
}
