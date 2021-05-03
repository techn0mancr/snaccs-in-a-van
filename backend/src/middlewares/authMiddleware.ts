/* Import the required libraries and types */
import { NextFunction, Request, Response } from "express";
import { Customer } from "../models";

/* Middleware to authenticate a customer based on their session data */
async function customerAuth(req: Request, res: Response, next: NextFunction) {
    /* Check if the session's customerId field is populated */
    if (req.session.customerId && req.session.customerId != undefined) {
        /* Cast the ObjectIds */
        var castedCustomerId: undefined = (req.session.customerId as unknown) as undefined;

        /* Verify that a customer with the customerId exists in the database */
        const existingCustomer = await Customer.findById(castedCustomerId);
        if (existingCustomer)
            next();
    }
    else
        res.status(401).send("Unauthorized");
}

/* Export the authentication middlewares */
export {
    customerAuth
}
