/* Import required types */
import { compareSync } from "bcrypt";
import { Request, Response } from "express";

/* Import required constants and models */
import {
    LATE_FULFILLMENT_TIME_WINDOW,
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
            if (deltaSincePlaced > LATE_FULFILLMENT_TIME_WINDOW)
                currentOrder.total *= (1 - LATE_FULFILLMENT_DISCOUNT);

            /* Save the updates to the database */
            await currentOrder.save();

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

/* Get the given vendor's completed orders */
async function getCompletedOrders(req: Request, res: Response): Promise<void> {
    try {
        /* Query the database */
        const completedOrders = await Order.find(
            {
                vendorId: req.session.vendorId,
                $or: [
                    { status: { $eq: OrderStatus.Completed } },
                    { status: { $eq: OrderStatus.Cancelled } }
                ]
            }
        ).populate(
            {
                model: "Customer",
                path: "customerId",
                select: "email givenName familyName"
            }
        ).populate(
            {
                model: "Item",
                path: "items.itemId",
            }
        ).select("customerId status items total isChanged placedTimestamp fulfilledTimestamp completedTimestamp isChanged rating")
         .sort("-completedTimestamp");

        /* Send the query results */
        if (completedOrders) {
            if (completedOrders.length > 0)
                res.status(200).json(completedOrders);
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

/* Get the given vendor's fulfilled orders */
async function getFulfilledOrders(req: Request, res: Response): Promise<void> {
    try {
        /* Query the database */
        const fulfilledOrders = await Order.find(
            {
                vendorId: req.session.vendorId,
                status: {
                    $eq: OrderStatus.Fulfilled
                }
            }
        ).populate(
            {
                model: "Customer",
                path: "customerId",
                select: "email givenName familyName"
            }
        ).populate(
            {
                model: "Item",
                path: "items.itemId",
            }
        ).select("customerId status items total isChanged placedTimestamp fulfilledTimestamp isChanged")
         .sort("fulfilledTimestamp");

        /* Send the query results */
        if (fulfilledOrders) {
            if (fulfilledOrders.length > 0)
                res.status(200).json(fulfilledOrders);
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

/* Get the given vendor's placed orders */
async function getPlacedOrders(req: Request, res: Response): Promise<void> {
    try {
        /* Query the database */
        const placedOrders = await Order.find(
            {
                vendorId: req.session.vendorId,
                status: {
                    $eq: OrderStatus.Placed
                }
            }
        ).populate(
            {
                model: "Customer",
                path: "customerId",
                select: "email givenName familyName"
            }
        ).populate(
            {
                model: "Item",
                path: "items.itemId",
            }
        ).select("customerId status items total isChanged placedTimestamp isChanged")
         .sort("placedTimestamp");

        /* Send the query results */
        if (placedOrders) {
            if (placedOrders.length > 0)
                res.status(200).json(placedOrders);
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

/* Returns the profile of the current logged-in vendor */
async function getProfile(req: Request, res: Response) {
    try {
        if (req.session.vendorId) {
            /* Query the database */
            const currentVendor = await Vendor.findById(req.session.vendorId)
                                              .select("email name locationDescription isOpen geolocation");
            if (currentVendor)
                res.status(200).json(currentVendor);
            else
                res.status(404).send("Not Found");

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

/* Sets a vendor's geolocation coordinates */
async function setVendorGeolocation(req: Request & {
    body: { latitude: number, longitude: number }
}, res: Response): Promise<void> {
    try {
        /* Query the database */
        const vendor = await Vendor.findById(req.session.vendorId);
        if (vendor) {
            vendor.latitude = req.body.latitude;
            vendor.longitude = req.body.longitude;
            await vendor.save();

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

/* Sets a vendor's location description */
async function setVendorLocationDescription(req: Request & {
    body: { locationDescription: string }
}, res: Response): Promise<void> {
    try {
        /* Query the database */
        const vendor = await Vendor.findById(req.session.vendorId);
        if (vendor) {
            vendor.locationDescription = req.body.locationDescription;
            await vendor.save();

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

/* Export controller functions */
export {
    completeOrder,
    fulfillOrder,
    getPlacedOrders,
    getProfile,
    getFulfilledOrders,
    getCompletedOrders,
    login,
    logout,
    setVendorAvailability,
    setVendorLocationDescription,
    setVendorGeolocation
}
