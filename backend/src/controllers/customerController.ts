/* Import required libraries and types */
import { compareSync } from "bcrypt";
import { Request, Response } from "express";

/* Import required models */
import {
    Customer, ICustomer,
    Item,
    ItemOrder, IItemOrder,
    Order, IOrder,
    OrderStatus
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

/* Checks out the customer's current cart */
async function checkoutCart(req: Request, res: Response): Promise<void> {
    req.session.vendorId = "60707b103ed89dee65af78a2"; // hard code to make this route work for now; normally the customer would've selected a vendor at this point
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

/* Clears the customer's current cart */
async function emptyCart(req: Request, res: Response): Promise<void> {
    req.session.cart = [];
    res.status(200).send("OK");
}

/* Returns the logged in customer's active orders */
async function getActiveOrders(req: Request, res: Response): Promise<void> {
    try {
        if (req.session.customerId && req.session.customerId != undefined) {
            /* Cast the ObjectIds */
            var castedCustomerId: undefined = (req.session.customerId as unknown) as undefined;

            /* Query the database */
            const activeOrders = await Order.find(
                {
                    customerId: castedCustomerId,
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
        if (req.session.customerId && req.session.customerId != undefined) {
            /* Cast the ObjectIds */
            var castedCustomerId: undefined = (req.session.customerId as unknown) as undefined;

            /* Query the database */
            const pastOrders = await Order.find(
                {
                    customerId: castedCustomerId,
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
        if (req.session.customerId && req.session.customerId != undefined) {
            /* Cast the ObjectIds */
            var castedCustomerId: undefined = (req.session.customerId as unknown) as undefined;
            
            /* Query the database */
            const customer = await Customer.findById(castedCustomerId)
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
    req.session.customerId = undefined;
    res.status(200).send("OK");
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

/* Export controller functions */
export {
    addItemToCart,
    checkoutCart,
    emptyCart,
    getActiveOrders,
    getCart,
    getPastOrders,
    getProfile,
    login,
    logout,
    register
}
