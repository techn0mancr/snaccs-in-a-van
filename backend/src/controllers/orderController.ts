/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Order, OrderStatus } from "../models";

/* Sets the status of a given order to "Fulfilled" */
async function fulfillOrder(req: Request & {params: {orderId: string}}, res : Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;
        
        /* Query the database */
        const qResult = await Order.updateOne(
            {
                _id: castedOrderId
            },
            {
                $set: {
                    status: OrderStatus.Fulfilled,
                    fulfilledTimestamp: new Date()
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

/* Returns the details of an order */
async function getOrderDetails(req: Request & {
    params: { orderId: string }
}, res: Response) {
    try {
        /* Cast the ObjectIds */
        var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;
        
        /* Query the database */
        const order = await Order.findById(castedOrderId)
                                 .populate(
                                     {
                                         model: "Customer",
                                         path: "customerId",
                                         select: "email givenName familyName"
                                     }
                                 ).populate(
                                    {
                                         model: "Vendor",
                                         path: "vendorId",
                                         select: "name locationDescription geolocation"
                                    }
                                 ).populate(
                                    {
                                        model: "Item",
                                        path: "items.itemId",
                                        select: "name price"
                                    }
                                 );

        /* Send the query results */
        if (order)
            res.status(200).json(order);
        else
            res.status(404).send("Not Found");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Export controller functions */
export {
    fulfillOrder,
    getOrderDetails
}
