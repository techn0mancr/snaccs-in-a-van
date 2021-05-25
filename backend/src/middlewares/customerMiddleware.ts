/* Import the required libraries and types */
import { NextFunction, Request, Response } from "express";
import { Customer } from "../models";

/* Authenticate a customer based on their session data */
async function authenticate(req: Request, res: Response, next: NextFunction) {
    /* Check if the session data is characteristic of a customer */
    if (!req.session.customerId || !req.session.cart) {
        res.status(401).send("Unauthorized");
        return;
    }
    
    /* Verify that the customer exists */
    const existingCustomer = await Customer.findById(req.session.customerId);
    if (!existingCustomer) {
        res.status(401).send("Unauthorized");
        return;
    }
    
    /* Continue executing the next middleware */
    next();
}

/* Export the customer middlewares */
export {
    authenticate
}
