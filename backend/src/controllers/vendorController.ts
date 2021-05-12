/* Import required types */
import { compareSync } from "bcrypt";
import { Request, Response } from "express";

/* Import required constants and models */
import {
    LATE_FULFILLMENT_ELAPSED_TIME,
    LATE_FULFILLMENT_DISCOUNT
} from "../config";

import {
    Order, OrderStatus,
    Vendor
} from "../models";


/* Sets the status of a given order to "Completed" */
async function completeOrder(req: Request & {
    params: { orderId: string }
}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;

        /* Query the database */
        const qResult = await Order.updateOne(
            {
                _id: castedOrderId,
                vendorId: req.session.vendorId
            },
            {
                $set: {
                    status: OrderStatus.Completed,
                    completedTimestamp: new Date()
                }
            }
        );
        
        /* Check if the query has successfully executed */
        if (qResult.ok == 1) {
            if (qResult.n > 0 && qResult.nModified > 0 && qResult.n == qResult.nModified)
                res.status(200).send("OK");
            else
                res.status(404).send("Not Found");
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (e) {

    }
}

/* Sets the status of a given order to "Fulfilled" and applies the fulfillment
 * discount if a certain amount of time has passed since the order was placed */
async function fulfillOrder(req: Request & {
    params: { orderId: string }
}, res : Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;
             
        /* Query the database */
        const currentOrder = await Order.findOne(
            {
                _id: castedOrderId,
                vendorId: req.session.vendorId
            }
        );

        if (currentOrder) {
            /* Update the current order's fields */
            currentOrder.status = OrderStatus.Fulfilled;
            currentOrder.fulfilledTimestamp = new Date();

            /* Check if a certain amount of time has passed since placement */
            var deltaSincePlaced: number =
                currentOrder.fulfilledTimestamp.getTime() - currentOrder.placedTimestamp.getTime();
            if (deltaSincePlaced > LATE_FULFILLMENT_ELAPSED_TIME)
                currentOrder.total *= (1 - LATE_FULFILLMENT_DISCOUNT);

            /* Save the updates to the database */
            currentOrder.save();

            /* Send a response */
            res.status(200).send("OK");
        }
        else
            res.status(404).send("Not Found");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}
/* Get the given vendor's outstanding orders */
async function getOutstandingOrders(req: Request, res: Response): Promise<void> {
    try {
        /* Query the database */
        const outstandingOrders = await Order.find(
            {
                vendorId: req.session.vendorId,
                status: {
                    $ne: OrderStatus.Completed
                }
            }
        ).populate(
            {
                model: "Item",
                path: "items.itemId",
            }
        ).select("customerId status items total isChanged orderTimestamp fulfilledTimestamp isChanged");

        /* Send the query results */
        if (outstandingOrders) {
            if (outstandingOrders.length > 0)
                res.status(200).json(outstandingOrders);
            else
                res.status(204).send("No Content");
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Logs a vendor in */
async function login(req: Request & {
    body: { email: String, password: String }
}, res: Response): Promise<void> {
    try {
        /* Check if a vendor with the given email exists */
        const vendor = await Vendor.findOne(
            {
                email: req.body.email.toLowerCase()
            }
        );

        /* Verify the vendor's credentials */
        if (!(vendor && compareSync(req.body.password, vendor.password)))
            res.status(400).send("Incorrect email/password!");
        else {
            /* Update the session data */
            req.session.customerId = undefined;
            req.session.vendorId = vendor._id;
            req.session.cart = undefined;

            /* Send a response */
            res.status(200).send("OK");
        }
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Logs a customer out */
async function logout(req: Request, res: Response): Promise<void> {
    /* Update the session data */
    req.session.customerId = undefined;
    req.session.vendorId = undefined;
    req.session.cart = undefined;

    /* Send a response */
    res.status(200).send("OK");
}

/* Sets the given vendor's availability */
async function setVendorAvailability(req: Request & {
    body: { isOpen: boolean }
}, res: Response): Promise<void> {
    try {
        /* Query the database */
        const qResult = await Vendor.updateOne(
            {
                _id: req.session.vendorId
            },
            {
                $set: {
                    isOpen: req.body.isOpen
                }
            }
        );

        /* Check if the query has successfully executed */
        if (qResult.ok == 1) {
            if (qResult.n > 0) {
                if (qResult.n == qResult.nModified)
                    res.status(200).send("OK"); // vendor was successfully updated
                else
                    res.status(400).send("Bad Request"); // vendor cannot be updated
            }
            else
                res.status(404).send("Not Found"); // vendor wasn't found in the database
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Sets a vendor's geolocation coordinates and location description */
async function setVendorLocation(req: Request & {
    body: { locationDescription: string, geolocation: Array<number> }
}, res: Response): Promise<void> {
    try {
        /* Query the database */
        const qResult = await Vendor.updateOne(
            {
                _id: req.session.vendorId
            },
            {
                $set: {
                    geolocation: req.body.geolocation,
                    locationDescription: req.body.locationDescription
                }
            }
        );

        /* Check if the query has successfully executed */
        if (qResult.ok == 1) {
            if (qResult.n > 0) {
                if (qResult.n == qResult.nModified)
                    res.status(200).send("OK"); // vendor was successfully updated
                else
                    res.status(400).send("Bad Request"); // vendor cannot be updated
            }
            else
                res.status(404).send("Not Found"); // vendor wasn't found in the database
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Export controller functions */
export {
    completeOrder,
    fulfillOrder,
    getOutstandingOrders,
    login,
    logout,
    setVendorAvailability,
    setVendorLocation
}
