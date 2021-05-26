/* Import required types */
import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

/* Import required constants and models */
import {
    LATE_FULFILLMENT_TIME_WINDOW,
    LATE_FULFILLMENT_DISCOUNT,
    MAX_NEAREST_VENDORS
} from "../config";

import {
    Order, OrderStatus,
    IVendor, Vendor
} from "../models";


/* Sets the status of a given order to "Completed" */
async function completeOrder(req: Request & {
    params: { orderId: string }
}, res: Response): Promise<void> {
    /* Validate the inputs */
    await param("orderId")
          .isMongoId()
          .run(req);

    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }
    
    try {
        /* Cast the ObjectIds */
        var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;

        /* Query the database for the given order's details */
        const orderToComplete = await Order.findOne(
            {
                _id: castedOrderId,
                vendorId: req.session.vendorId
            }
        );
        if (!orderToComplete) {
            res.status(404).send("Not Found");
            return;
        }

        /* Update the order's details */
        orderToComplete.status = OrderStatus.Completed;
        orderToComplete.timestamps.completed = new Date();

        await orderToComplete.save();

        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Sets the status of a given order to "Fulfilled" and applies the fulfillment
 * discount if a certain amount of time has passed since the order was placed */
async function fulfillOrder(req: Request & {
    params: { orderId: string }
}, res : Response): Promise<void> {
    /* Validate the inputs */
    await param("orderId")
          .isMongoId()
          .run(req);

    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }

    try {
        /* Cast the ObjectIds */
        var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;
             
        /* Query the database for the given order's details */
        const orderToFulfill = await Order.findOne(
            {
                _id: castedOrderId,
                vendorId: req.session.vendorId
            }
        );
        if (!orderToFulfill) {
            res.status(404).send("Not Found");
            return;
        }
        
        /* Update the current order's details */
        orderToFulfill.status = OrderStatus.Fulfilled;
        orderToFulfill.timestamps.fulfilled = new Date();

        /* Check if a certain amount of time has passed since placement */
        var deltaSincePlaced: number =
            orderToFulfill.timestamps.fulfilled.getTime() - orderToFulfill.timestamps.placed.getTime();
        if (deltaSincePlaced > LATE_FULFILLMENT_TIME_WINDOW)
            orderToFulfill.total *= (1 - LATE_FULFILLMENT_DISCOUNT);

        /* Save the updates to the database */
        await orderToFulfill.save();

        /* Send a response */
        res.status(200).send("OK");
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
        ).select("customerId status items total isChanged timestamps isChanged rating")
         .sort("-timestamps.completed");
        
        /* Check if the query returned anything */
        if (!completedOrders || (completedOrders.length <= 0)) {
            res.status(204).send("No Content");
            return;
        }
        
        res.status(200).json(completedOrders);
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
        ).select("customerId status items total isChanged timestamps isChanged")
         .sort("timestamps.fulfilled");

        /* Check if the query returned anything */
        if (!fulfilledOrders || (fulfilledOrders.length <= 0)) {
            res.status(204).send("No Content");
            return;
        }
        
        res.status(200).json(fulfilledOrders);
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Get the nearest MAX_NEAREST_VENDORS open vendors to the given geolocation tuple */
async function getNearestOpenVendors(req: Request & {
    params: { geolocation: string }
}, res: Response): Promise<void> {
    /* Validate the inputs */
    await param("geolocation")  // should be formatted as "<latitude>,<longitude>"
          .isLatLong()
          .run(req);

    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }

    try {
        /* Query the database for all the vendors */
        const vendorList = await Vendor.find(
            {
                isOpen: true
            }
        ).select("email name locationDescription isOpen geolocation");
        if (!vendorList || (vendorList.length <= 0)) {
            res.status(204).send("No Content");
            return;
        }
        
        /* Sort the vendors based on their distance to the given geolocation */
        var [givenLat, givenLong] = req.params.geolocation.split(",").map(Number);
        vendorList.sort((v1: IVendor, v2: IVendor) => {
            var [v1Lat, v1Long] = v1.geolocation;
            var [v2Lat, v2Long] = v2.geolocation;
            var sqDistToV1: number =
                Math.pow(v1Long - givenLong, 2) +
                Math.pow(v1Lat - givenLat, 2)
            var sqDistToV2: number =
                Math.pow(v2Long - givenLong, 2) +
                Math.pow(v2Lat - givenLat, 2)
            return sqDistToV1 - sqDistToV2;
        });
        
        /* Take the nearest MAX_NEAREST_VENDORS vendors */
        var nearestVendors: Array<IVendor> = vendorList.slice(0, MAX_NEAREST_VENDORS);
        if (!nearestVendors || (nearestVendors.length <= 0)) {
            res.status(204).send("No Content");
        }

        /* Send a response */
        res.status(200).json(nearestVendors);
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
    return;
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
        ).select("customerId status items total isChanged timestamps isChanged")
         .sort("timestamps.placed");

        /* Check if the query returned anything */
        if (!placedOrders || (placedOrders.length <= 0)) {
            res.status(204).send("No Content");
            return;
        }
        
        res.status(200).json(placedOrders);
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Returns the profile of the current logged-in vendor */
async function getProfile(req: Request, res: Response) {
    try {
        /* Query the database for the current vendor's details */
        const vendorDetails = await Vendor.findById(req.session.vendorId)
                                          .select("email name locationDescription isOpen geolocation");
        if (!vendorDetails) {
            res.status(404).send("Not Found");
            return;
        }
        
        res.status(200).json(vendorDetails);
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Logs a vendor in */
async function login(req: Request & {
    body: { name: string, password: string }
}, res: Response): Promise<void> {
    /* Validate and sanitize the inputs */
    await body("name")
          .isAlphanumeric()
          .trim().escape()
          .run(req);
    await body("password")
          .isAscii().isLength({ min: 8 })
          .run(req);
    
    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }
    
    try {
        /* Check if a vendor with the given email exists */
        const vendor = await Vendor.findOne(
            {
                name: req.body.name
            }
        );

        /* Verify the vendor's credentials */
        if (!(vendor && compareSync(req.body.password, vendor.password))) {
            res.status(400).send("Incorrect email/password!");
            return;
        }
        
        /* Update the session data */
        req.session.customerId = undefined;
        req.session.vendorId = vendor._id;
        req.session.cart = undefined;

        /* Send a response */
        res.status(200).send("OK");
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

/* Sets a vendor's geolocation coordinates */
async function setVendorGeolocation(req: Request & {
    body: { latitude: number, longitude: number }
}, res: Response): Promise<void> {
    /* Validate and sanitize the inputs */
    await body("latitude")
          .isFloat()
          .toFloat()
          .run(req);
    await body("longitude")
          .isFloat()
          .toFloat()
          .run(req);
    
    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }

    try {
        /* Query the database for the current vendor's details */
        const currentVendor = await Vendor.findById(req.session.vendorId);
        if (!currentVendor) {
            res.status(404).send("Not Found");
            return;
        }
        
        /* Update the current vendor's details */
        currentVendor.geolocation = [req.body.latitude, req.body.longitude];
        await currentVendor.save();

        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Sets a vendor's location description */
async function setVendorLocationDescription(req: Request & {
    body: { locationDescription: string }
}, res: Response): Promise<void> {
    /* Validate and sanitize the inputs */
    await body("locationDescription")
          .isAscii()
          .trim()
          .run(req);

    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }

    try {
        /* Query the database for the current vendor's details */
        const currentVendor = await Vendor.findById(req.session.vendorId);
        if (!currentVendor) {
            res.status(404).send("Not Found");
            return;
        }
        
        /* Update the current vendor's details */
        currentVendor.locationDescription = req.body.locationDescription;
        await currentVendor.save();

        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Toggles the given vendor's availability */
async function toggleVendorAvailability(req: Request, res: Response): Promise<void> {
    try {
        /* Query the database */
        const currentVendor = await Vendor.findById(req.session.vendorId);
        if (!currentVendor) {
            res.status(404).send("Not Found");
            return;
        }
        
        /* Check the vendor's current open status */
        if (currentVendor.isOpen) {
            /* Check if the vendor has outstanding orders */
            const outstandingOrders = await Order.find(
                {
                    vendorId: req.session.vendorId,
                    $or: [
                        { status: { $eq: OrderStatus.Placed } },
                        { status: { $eq: OrderStatus.Fulfilled } }
                    ]
                }
            );

            if (outstandingOrders && (outstandingOrders.length > 0)) {
                res.status(403).send("Forbidden");
                return; 
            }
        }
        currentVendor.isOpen = !(currentVendor.isOpen);
        await currentVendor.save();

        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Export controller functions */
export {
    completeOrder,
    fulfillOrder,
    getCompletedOrders,
    getFulfilledOrders,
    getNearestOpenVendors,
    getPlacedOrders,
    getProfile,
    login,
    logout,
    setVendorLocationDescription,
    setVendorGeolocation,
    toggleVendorAvailability
}
