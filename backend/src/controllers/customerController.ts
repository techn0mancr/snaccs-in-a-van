/* Import required libraries and types */
import { compareSync } from "bcrypt";
import { Request, Response } from "express";

/* Import required constants and models */
import {
    ORDER_AMENDMENT_TIME_WINDOW
} from "../config";

import {
    Customer, ICustomer,
    Item,
    ItemOrder, IItemOrder,
    Order, IOrder,
    OrderStatus,
    Vendor
} from "../models";

/* Adds the given item, in the given quantity, to the customer's cart */
async function addItemToCart(req: Request & {
    params: { itemId: string },
    body: { quantity: number }
}, res: Response): Promise<void> {
    try {
        /* Ensure that the customer's cart exists */
        if (!req.session.cart)
            req.session.cart = []
        
        /* Cast the ObjectIds */
        var castedItemId: undefined = (req.params.itemId as unknown) as undefined;
        
        /* Check the existence of the given itemId in the database */
        const existingItem = await Item.findById(castedItemId);
        if (existingItem) {
            /* Check if an item order of the given itemId already exists in the cart */
            var itemOrderIndex = req.session.cart.findIndex((itemOrder: IItemOrder) => itemOrder.itemId.equals(castedItemId));
            if (itemOrderIndex > -1) {
                /* Update the existing item order */
                ((req.session.cart)[itemOrderIndex]).quantity += req.body.quantity;
                ((req.session.cart)[itemOrderIndex]).subtotal += existingItem.price * req.body.quantity;
            }
            else {
                /* Create a new item order */
                var newItemOrder: IItemOrder = new ItemOrder(
                    {
                        itemId: castedItemId,
                        quantity: req.body.quantity,
                        subtotal: existingItem.price * req.body.quantity
                    }
                );
                
                /* Add the new item order to the cart */
                req.session.cart.push(newItemOrder);
            }
            
            /* Send a response */
            res.status(200).send("OK");
        }
        else
            res.status(404).send("Not Found");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Cancels the customer's given order */
async function cancelOrder(req: Request & {
    params: { orderId: string }
}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedOrderId: undefined = (req.params.orderId as unknown) as undefined;
        
        /* Check if the order is made by the current customer within a certain amount of time  */
        const currentOrder = await Order.findOne(
            {
                _id: castedOrderId,
                customerId: req.session.customerId
            }
        );
        if (currentOrder) {
            /* Check if a certain amount of time has passed since placement */
            var deltaSincePlaced: number =
                (new Date()).getTime() - currentOrder.placedTimestamp.getTime();
            if (deltaSincePlaced <= ORDER_AMENDMENT_TIME_WINDOW) {
                /* Update the order details */
                currentOrder.status = OrderStatus.Cancelled;
                currentOrder.completedTimestamp = new Date();
                await currentOrder.save();

                /* Send a response */
                res.status(200).send("OK");
            }
            else
                res.status(403).send("Forbidden");
        }
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Checks out the customer's current cart */
async function checkoutCart(req: Request, res: Response): Promise<void> {
    try {
        /* Ensures that the cart is populated */
        if (req.session.cart && (req.session.cart.length > 0)) {
            /* Calculate the cart's total */
            var cartTotal: number = 0;
            req.session.cart.forEach((itemOrder: IItemOrder) => cartTotal += itemOrder.subtotal);
            
            /* Insert a new order into the database */
            var newOrder: IOrder = new Order(
                {
                    customerId: req.session.customerId,
                    vendorId: req.session.vendorId,
                    total: cartTotal
                }
            );
            req.session.cart.forEach((itemOrder: IItemOrder) => newOrder.items.push(itemOrder));
            await newOrder.save();

            /* Empty the cart */
            req.session.cart = [];

            /* Send a response */
            res.status(201).send("Created");
        }
        else
            res.status(403).send("Forbidden");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Empties the customer's current cart */
async function emptyCart(req: Request, res: Response): Promise<void> {
    req.session.cart = [];
    res.status(200).send("OK");
}

/* Finish the order amendment process */
async function finalizeOrderAmendment(req: Request & {
    params: { orderId: string }
}, res: Response): Promise<void> {

}

/* Returns the logged in customer's active orders */
async function getActiveOrders(req: Request, res: Response): Promise<void> {
    try {
        if (req.session.customerId) {
            /* Query the database */
            const activeOrders = await Order.find(
                {
                    customerId: req.session.customerId,
                    $or: [
                        { status: { $eq: OrderStatus.Placed } },
                        { status: { $eq: OrderStatus.Fulfilled } }
                    ]
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
                    path: "items.itemId"
                }
            ).select("vendorId status items total placedTimestamp fulfilledTimestamp isChanged");

            /* Send the query results */
            if (activeOrders) {
                if (activeOrders.length > 0)
                    res.status(200).json(activeOrders);
                else
                    res.status(204).send("No Content");
            }
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Returns the customer's current cart */
async function getCart(req: Request, res: Response): Promise<void> {
    /* Ensure that the customer's cart exists */
    if (!req.session.cart)
        req.session.cart = []

    /* Populate the cart */
    var populatedCart: Array<IItemOrder> = [];
    for (var itemOrder of req.session.cart) {
        /* Create a new ItemOrder */
        var populatedItemOrder: IItemOrder = new ItemOrder(
            {
                itemId: itemOrder.itemId,
                quantity: itemOrder.quantity,
                subtotal: itemOrder.subtotal
            }
        );

        /* Query the database for item details */
        const itemDetails = await Item.findById(itemOrder.itemId)
                                      .select("name price");
        
        /* Manually populate the itemId field */
        if (itemDetails)
            populatedItemOrder.itemId = itemDetails;
        
        /* Add the populated item to the populated cart */
        populatedCart.push(populatedItemOrder);
    } 
    
    /* Send the populated cart */
    res.status(200).json(populatedCart);
}

/* Returns the logged in customer's past orders */
async function getPastOrders(req: Request, res: Response): Promise<void> {
    try {
        if (req.session.customerId) {
            /* Query the database */
            const pastOrders = await Order.find(
                {
                    customerId: req.session.customerId,
                    $or: [
                        { status: { $eq: OrderStatus.Completed } },
                        { status: { $eq: OrderStatus.Cancelled } }
                    ]
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
                    path: "items.itemId"
                }
            ).select("vendorId status items total placedTimestamp fulfilledTimestamp completedTimestamp isChanged");

            /* Send the query results */
            if (pastOrders) {
                if (pastOrders.length > 0)
                    res.status(200).json(pastOrders);
                else
                    res.status(204).send("No Content");
            }
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Returns the profile of the current logged-in customer */
async function getProfile(req: Request, res: Response) {
    try {
        if (req.session.customerId) {
            /* Query the database */
            const customer = await Customer.findById(req.session.customerId)
                                           .select("email givenName familyName");
            if (customer)
                res.status(200).json(customer);
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

/* Begin the order amendment process */
async function initializeOrderAmendment(req: Request & {
    params: { orderId: string }
}, res: Response): Promise<void> {

}

/* Logs a customer in */
async function login(req: Request & {
    body: { email: String, password: String }
}, res: Response): Promise<void> {
    try {
        /* Check if a customer with the given email exists */
        const customer = await Customer.findOne(
            {
                email: req.body.email.toLowerCase()
            }
        );

        /* Verify the customer's credentials */
        if (!(customer && compareSync(req.body.password, customer.password)))
            res.status(400).send("Incorrect email/password!");
        else {
            /* Update the session data */
            req.session.customerId = customer._id;
            req.session.cart = customer.cart;
            if (!req.session.vendorId)
                req.session.vendorId = undefined;
            if (!req.session.cart)
                req.session.cart = [];
            
            /* Send a response */
            res.status(200).send("OK");
        }
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Logs a customer out */
async function logout(req: Request, res: Response): Promise<void> {
    /* Store the current customer's cart in the database */
    try {
        /* Query the database */
        const customer = await Customer.findById(req.session.customerId);
        if (customer && req.session.cart) {
            /* Empty the current customer's cart */
            const qResult = await Customer.updateOne(
                {
                    _id: req.session.customerId
                },
                {
                    $set: {
                        cart: []
                    }
                }
            );
           
            /* Add all the item orders in the cart to the customer's now-empty cart */
            req.session.cart.forEach((itemOrder: IItemOrder) => customer.cart.push(itemOrder));
            await customer.save();
        }
        
        /* Update the session data */
        req.session.customerId = undefined;
        req.session.cart = [];

        res.status(200).send("OK");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Submits a rating for a completed order */
async function rateOrder(req: Request & {
    params: { orderId: string },
    body: { rating: number }
}, res: Response): Promise<void> {
    try {
        /* Check if the order is already completed and made by the current customer */
        const order = await Order.findOne(
            {
                _id: req.params.orderId,
                customerId: req.session.customerId,
                status: OrderStatus.Completed
            }
        );
        if (order) {
            /* Submit the rating */
            order.rating = req.body.rating;
            await order.save();

            /* Send a response */
            res.status(200).send("OK");
        }
        else
            res.status(404).send("Not Found");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Registers a new customer */
async function register(req: Request & {
    body: { email: String, givenName: String, familyName: String, password: String }
}, res: Response): Promise<void> {
    try {
        /* Check if the email is already used by an existing customer */
        const existingCustomer = await Customer.findOne(
            {
                email: req.body.email.toLowerCase()
            }
        );
        if (!existingCustomer) {
            /* Insert a new customer into the database */
            const newCustomer: ICustomer = new Customer(
                {
                    email: req.body.email.toLowerCase(),
                    givenName: req.body.givenName,
                    familyName: req.body.familyName,
                    password: req.body.password
                }
            );
            await newCustomer.save();

            /* Update the session data */
            req.session.customerId = newCustomer._id;
            if (!req.session.vendorId)
                req.session.vendorId = undefined;
            if (!req.session.cart)
                req.session.cart = [];

            /* Send a response */
            res.status(201).send("Created");
        }
        else
            res.status(403).send("Forbidden");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Selects the given vendor */
async function selectVendor(req: Request & {
    params: { vendorId: string }
}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        
        /* Check if a vendor with the given ID is valid */
        const vendor = await Vendor.findById(castedVendorId);
        if (vendor) {
            req.session.vendorId = castedVendorId;
            res.status(200).send("OK");
        }
        else
            res.status(404).send("Not Found");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}


async function getVendorGeolocations(req: Request, res: Response): Promise<void> {
    try {
        if (req.session.customerId) {
            /* Query the database */
            const vendorList = await Vendor.find(
                {   isOpen: true    }
            ).populate(
                {
                    model: "Vendor",
                    path: "VendorId",
                    select: "name latitude longitude"
                }
            ).select("name latitude longitude")
        

            /* Send the query results */
            if (vendorList) {
                if (vendorList.length > 0) {
                    res.status(200).json(vendorList)
                }
                else {
                    res.status(204).send("All Vendors Closed")
                }
            }

    }
    else {
        res.status(500).send('Internal Server Error');
    }
    }
    catch(e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}
//         if (vendorList) {
//             if (vendorList.length > 0)
//                 res.status(200).json(vendorList);
//             else
//                 res.status(204).send("No Content");
//         }
//     }
//     else
//         res.status(500).send("Internal Server Error");
// }
// catch (e) {
//     res.status(500).send(`Internal Server Error: ${e.message}`);
// }



/* Export controller functions */
export {
    addItemToCart,
    cancelOrder,
    checkoutCart,
    emptyCart,
    finalizeOrderAmendment,
    getActiveOrders,
    getCart,
    getPastOrders,
    getProfile,
    initializeOrderAmendment,
    login,
    logout,
    rateOrder,
    register,
    selectVendor,
    getVendorGeolocations
}
