/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Vendor, Order } from "../models";
// import OrderStatus from "models/orderModel"

/* Define the order status enum */
enum OrderStatus {
    Placed = "Placed",
    Fulfilled = "Fulfilled",
    Completed = "Completed"
}


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
async function setVendorCustomLocation(req: Request &{params:{locationDescription : string, vendorID: string}}, res : Response): Promise<void> {
    var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;

    var newLocationDescription: undefined =  (req.params.locationDescription as unknown) as undefined;

    const newDescription = await Vendor.updateOne(
                                {
                                    _id : castedVendorId
                                },
                                {
                                    $set :
                                    {
                                        "locationDescription" : newLocationDescription
                                    }
                                }
                            )

    if (newDescription) res.status(200).send(newDescription);
    else res.status(404).send("Not found");
}

/* set vendor open/closed for orders */
async function setVendorAvailability(req: Request &{params:{isOpen : boolean, vendorID: string}}, res : Response): Promise<void> {
    var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;

    var newIsOpen: boolean =  (req.params.isOpen as boolean) as boolean;

    const newOpen = await Vendor.updateOne(
        {
            _id : castedVendorId
        },
        {
            $set :
            {
                "isOpen" : newIsOpen
            }
        }
    )

    
    if (newOpen) res.status(200).send(newOpen);
    else res.status(404).send("Not found");
}



/* get outstanding orders with its timestamp and items contained*/
async function getOutstandingOrders(req: Request & {params: {vendorId: string}}, res : Response) : Promise<void> {
    var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;

    /* Query the database */
    const outstandingOrders = await Vendor.find({vendorId: castedVendorId}, {isFulfilled: false})
                           .select("orders")
                           .populate("orders.orderId", "orderTimestamp items isFulfilled");

    /* Send a response */
    if (outstandingOrders) res.status(200).send(outstandingOrders);
    else res.status(404).send("Not found");
    
}

// /*queries database for order by orderId and changes its status*/
async function fulfilOrder(req: Request & {params: {isFulfilled : boolean, orderId: string}}, res : Response): Promise<void> {
    
    var newIsFulfilled: boolean = (req.params.isFulfilled as boolean) as boolean;
    var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;

    const fulfilledOrder = await Order.updateOne(
        {
            _id : castedOrderId
        },
        {
            $set : 
            {
                isFulfilled : newIsFulfilled,
                status : OrderStatus.Fulfilled           
            }
        }
    )
    
    if (fulfilledOrder) res.status(200).send(fulfilledOrder);
    else res.status(404).send("Not found");
}

/* Export functions */
export {
    getOutstandingOrders,
    setVendorCustomLocation,
    setVendorAvailability,
    fulfilOrder
    // ,getVendorLogin
};
