/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Order, OrderStatus, Vendor } from "../models";

/* Get the given vendor's outstanding orders */
async function getOutstandingOrders(req: Request & {params: {vendorId: string}}, res: Response): Promise<void> {
    try {
        /* Query the database */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        const outstandingOrders = await Order.find(
            {
                vendorId: castedVendorId,
                status: {
                    $ne: OrderStatus.Fulfilled
                },
                fulfilledTimestamp: undefined
            }
        );

        /* Send a response */
        if (outstandingOrders) {
            if (outstandingOrders.length > 0)
                res.status(200).send(outstandingOrders);
            else
                res.status(204).send("No Content");
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (CastError) {
        res.status(400).send("Bad Request");
    }
}

/* Sets the given vendor's availability */
async function setVendorAvailability(req: Request & {params: {vendorId: string}, body: {isOpen: boolean}}, res: Response): Promise<void> {
    try {
        /* Query the database */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
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
    
        /* Send a response */
        if (qResult.ok == 1) {
            if (qResult.n > 0 && qResult.nModified > 0 && qResult.n == qResult.nModified)
                res.status(200).send("OK");
            else
                res.status(404).send("Not Found");
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (CastError) {
        res.status(400).send("Bad Request");
    }
}

/* Sets a vendor's geolocation coordinates and location description */
// TODO: still doesn't work
async function setVendorLocation(req: Request & {params: {vendorId: string}, body: {locationDescription: string, geolocation: Array<number>}}, res: Response): Promise<void> {
    try {
        /* Query the database */
        var castedVendorId: undefined = (req.body.vendorId as unknown) as undefined;
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

        /* Send a response */
        if (qResult.ok == 1) {
            if (qResult.n > 0 && qResult.nModified > 0 && qResult.n == qResult.nModified)
                res.status(200).send("OK");
            else
                res.status(404).send("Not Found");
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (CastError) {
        res.status(400).send("Bad Request");
    }
}

/* Export controller functions */
export {
    getOutstandingOrders,
    setVendorAvailability,
    setVendorLocation
}
