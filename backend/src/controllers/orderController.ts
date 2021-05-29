/* Import required types */
import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

/* Import required models */
import { Order, OrderStatus } from "../models";

/* Returns the details of an order */
async function getOrderDetails(req: Request & {
    params: { orderId: string }
}, res: Response) {
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
        console.log(`(Order) getOrderDetails(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Export controller functions */
export {
    getOrderDetails
}
