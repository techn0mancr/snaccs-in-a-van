/* Import the required libraries and types */
import { NextFunction, Request, Response } from "express";
import { Customer } from "../models";

/* Middleware to authenticate a customer based on their session data */
async function customerAuth(req: Request, res: Response, next: NextFunction) {
    /* Check if the session's userId field is populated */
    if (req.session.userId) {
        /* Cast the ObjectIds */
        var castedCustomerId: undefined = (req.session.userId as unknown) as undefined;

        /* Verify that a customer with the customerId exists in the database */
        if (await Customer.findById(castedCustomerId)) next();
    }
    else {
        res.status(403).send("Forbidden");
    }
}

/* Export the authentication middlewares */
export {
    customerAuth
}
