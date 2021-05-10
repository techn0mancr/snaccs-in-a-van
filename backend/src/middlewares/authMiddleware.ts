/* Import the required libraries and types */
import { NextFunction, Request, Response } from "express";
import { Customer, Vendor } from "../models";

/* Middleware to authenticate a customer based on their session data */
async function customerAuth(req: Request, res: Response, next: NextFunction) {
    /* Check if the session data is characteristic of a customer */
    if (req.session.customerId && req.session.cart) {
        /* Verify that a customer with the customerId exists in the database */
        const existingCustomer = await Customer.findById(req.session.customerId);
        if (existingCustomer)
            next();
    }
    else
        res.status(401).send("Unauthorized");
}

/* Middleware to authenticate a vendor based on their session data */
async function vendorAuth(req: Request, res: Response, next: NextFunction) {
    /* Check if the session data is characteristic of a vendor */
    if (req.session.vendorId && !req.session.customerId && !req.session.cart) {
        /* Verify that a vendor with the vendorId exists in the database */
        const existingVendor = await Vendor.findById(req.session.vendorId);
        if (existingVendor)
            next();
    }
    else
        res.status(401).send("Unauthorized");
}

/* Export the authentication middlewares */
export {
    customerAuth,
    vendorAuth
}
