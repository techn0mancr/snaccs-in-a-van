/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Order, OrderStatus } from "../models";

/* Sets the status of a given order to "Fulfilled" */
async function fulfillOrder(req: Request & {params: {orderId: string}}, res : Response): Promise<void> {
    try {
        /* Query the database */
        var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;
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
        )
        
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
    fulfillOrder
}
