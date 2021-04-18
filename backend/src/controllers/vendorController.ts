/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Vendor, Order } from "../models";




// /* Asks vendor for login details 
//     will need changes...*/
// async function getVendorLogin(req: Request & {params: {Email : string , Password : string}}, res = Response): Promise<void> {
    
// }

// /* Get vendor's current location */
// async function getVendorGeoLocation(req: Request &{params: {askLocationPermission : boolean}}, res = Response): Promise<void> {
    
// }

// /* set vendor's location description */
async function setVendorCustomLocation(req: Request &{params:{locationDescription : string, vendorID: string}}, res = Response): Promise<void> {
    var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;

    var newLocationDescription: undefined =  (req.params.locationDescription as unknown) as undefined;

    const newDescription = await Vendor.update(
                                {
                                    Vendor : castedVendorId
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
// async function setVendorAvailability(req: Request , res = Response): Promise<void> {
//     set isOpen = false...
// }



/* get outstanding orders with its timestamp and items contained*/
async function getOutstandingOrders(req: Request & {params: {vendorId: string}}, res = Response) : Promise<void> {
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
// async function fulfilOrder(req: Request & {params: {orderId: string}}, res = Response): Promise<void> {
    //set isFulfilled true...
    //set status = ready for pickup...
// }

/*  */



/* Export functions */
export {
    getOutstandingOrders,
    setVendorCustomLocation
};






// /* Export functions */
// export {
//     getMenu,
//     getItemDetails
// };


