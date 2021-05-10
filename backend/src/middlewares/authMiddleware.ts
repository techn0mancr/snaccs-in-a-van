/* Import the required libraries and types */
import { NextFunction, Request, Response } from "express";
import { Customer, Vendor } from "../models";

/* Middleware to authenticate a customer based on their session data */
async function customerAuth(req: Request, res: Response, next: NextFunction) {
    /* Check if the session's customerId field is populated */
    if (req.session.customerId && req.session.customerId != undefined) {
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
    /* Check if the session's vendorId field is populated */
    if (req.session.vendorId && req.session.vendorId != undefined) {
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
