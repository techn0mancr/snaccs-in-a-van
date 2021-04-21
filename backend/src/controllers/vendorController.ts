/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Order, OrderStatus, Vendor } from "../models";

/* Get the given vendor's outstanding orders */
async function getOutstandingOrders(req: Request & {params: {vendorId: string}}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        
        /* Query the database */
        const outstandingOrders = await Order.find(
            {
                vendorId: castedVendorId,
                status: {
                    $ne: OrderStatus.Fulfilled
                },
                fulfilledTimestamp: undefined
            }
        );

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

/* Sets the given vendor's availability */
async function setVendorAvailability(req: Request & {params: {vendorId: string}, body: {isOpen: boolean}}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        
        /* Query the database */
        const qResult = await Vendor.updateOne(
            {
                _id: castedVendorId
            },
            {
                $set: {
                    isOpen: req.body.isOpen
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
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Sets a vendor's geolocation coordinates and location description */
async function setVendorLocation(req: Request & {params: {vendorId: string}, body: {locationDescription: string, geolocation: Array<number>}}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        
        /* Query the database */
        const qResult = await Vendor.updateOne(
            {
                _id: castedVendorId
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
            if (qResult.n > 0 && qResult.nModified > 0 && qResult.n == qResult.nModified)
                res.status(200).send("OK");
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

/* Export controller functions */
export {
    getOutstandingOrders,
    setVendorAvailability,
    setVendorLocation
}
