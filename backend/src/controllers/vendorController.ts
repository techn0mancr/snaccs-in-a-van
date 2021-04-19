/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Vendor, Order, OrderStatus } from "../models";


/* Asks vendor for login details 
    will need changes...*/

// async function getVendorLogin(req: Request & {params: {Email : string , Password : string, vendorId: string}}, res : Response): Promise<void> {
//     var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
//     var checkEmail: undefined = (req.params.Email as unknown) as undefined;
//     var checkPassword: undefined = (req.params.Password as unknown) as undefined;

//     const newEmailCheck = await Vendor.find({vendorId: castedVendorId})
//                             .select("email");
//     const newPasswordCheck = await Vendor.find({vendorId: castedVendorId})
//                             .select("password");
    
//     if ((newEmailCheck != checkEmail) || (newPasswordCheck != checkPassword)) {
//         res.status(404).send("Email/Password is wrong");
//     }
//     else (res.status(200).send("Logged In!"));

                            
// }

/* Get vendor's current location */

// async function getVendorGeoLocation(req: Request &{params: {askLocationPermission : boolean}}, res = Response): Promise<void> {
    
// }

// /* set vendor's location description */
async function setVendorCustomLocation(req: Request &{params: {vendorID: string, locationDescription: string}}, res: Response): Promise<void> {
    try {
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;

        const newDescription = await Vendor.updateOne(
                                    {
                                        _id: castedVendorId
                                    },
                                    {
                                        $set: {
                                            locationDescription: req.params.locationDescription
                                        }
                                    }
                                );

        if (newDescription) res.status(200).send(newDescription);
        else res.status(404).send("Not Found");

    }
    catch (CastError) {
        res.status(400).send("Bad Request");
    }
}

/* set vendor open/closed for orders */
async function setVendorAvailability(req: Request & {params: {vendorID: string}}, res: Response): Promise<void> {
    try {
        /* Query the database */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        var newOpenStatus: boolean = (req.params.isOpen === "true") ? true : false;
        const newOpen = await Vendor.updateOne(
            {
                _id: castedVendorId
            },
            {
                $set: {
                    isOpen: true
                }
            }
        );
    
        /* Send a response */
        if (newOpen) res.status(200).send(newOpen);
        else res.status(404).send("Not Found");
    }
    catch (CastError) {
        res.status(400).send("Bad Request");
    }
}

/* get outstanding orders with its timestamp and items contained*/
async function getOutstandingOrders(req: Request & {params: {vendorId: string}}, res: Response): Promise<void> {
    try {
        /* Query the database */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        const outstandingOrders = await Order.find({vendorId: castedVendorId, isFulfilled: false});
                                             //.populate("items.");

        /* Send a response */
        if (outstandingOrders) res.status(200).send(outstandingOrders);
        else res.status(404).send("Not Found");
    }
    catch (CastError) {
        res.status(400).send("Bad Request");
    }    
}

// /*queries database for order by orderId and changes its status*/
async function fulfillOrder(req: Request & {params: {orderId: string, isFulfilled: boolean}}, res : Response): Promise<void> {
    
    /* Querty the database */
    var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;
    var newStatus: string = "Fulfilled";
    const fulfilledOrder = await Order.updateOne(
        {
            _id: castedOrderId
        },
        {
            $set: {
                isFulfilled: req.params.isFulfilled,
                status: newStatus
            }
        }
    )
    
    /* Send a response */
    if (fulfilledOrder) res.status(200).send(fulfilledOrder);
    else res.status(404).send("Not Found");
}

/* Export functions */
export {
    getOutstandingOrders,
    setVendorCustomLocation,
    setVendorAvailability,
    fulfillOrder
    // ,getVendorLogin
};
