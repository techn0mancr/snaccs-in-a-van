/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Order, OrderStatus } from "../models";

/* Returns the details of an order */
async function getOrderDetails(req: Request & {
    params: { orderId: string }
}, res: Response) {
    try {
        /* Cast the ObjectIds */
        var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;
        
        /* Query the database for the given order's details */
        const orderDetails = await Order.findById(castedOrderId)
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
        
        /* Check if the query returned anything */
        if (!orderDetails) {
            res.status(404).send("Not Found");
            return;
        }
        
        res.status(200).json(orderDetails);
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Export controller functions */
export {
    getOrderDetails
}
