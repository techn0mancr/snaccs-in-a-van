/* Import required libraries and types */
import { compareSync } from "bcrypt";
import { Request, Response } from "express";

/* Import required models */
import { Customer, ICustomer, Item, IItemOrder, ItemOrder, Order, OrderStatus } from "../models";

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
            }
            else {
                /* Create an item order */
                var newItemOrder: IItemOrder = new ItemOrder(
                    {
                        itemId: castedItemId,
                        quantity: req.body.quantity
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

/* Clears the customer's current cart */
async function clearCart(req: Request, res: Response): Promise<void> {
    req.session.cart = [];
    res.status(200).send("OK");
}

/* Returns the logged in customer's active orders */
async function getActiveOrders(req: Request, res: Response): Promise<void> {
    try {
        if (req.session.userId && req.session.userId != undefined) {
            /* Cast the ObjectIds */
            var castedCustomerId: undefined = (req.session.userId as unknown) as undefined;

            /* Query the database */
            const activeOrders = await Order.find(
                {
                    customerId: castedCustomerId,
                    status: {
                        $ne: OrderStatus.Completed
                    }
                }
            ).populate(
                {
                    model: "Item",
                    path: "items.itemId",
                }
            ).select("vendorId status items total orderTimestamp fulfilledTimestamp isChanged");

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

    /* Send the contents of the cart */
    res.status(200).json(req.session.cart);
}

/* Returns the logged in customer's past orders */
async function getPastOrders(req: Request, res: Response): Promise<void> {
    try {
        if (req.session.userId && req.session.userId != undefined) {
            /* Cast the ObjectIds */
            var castedCustomerId: undefined = (req.session.userId as unknown) as undefined;

            /* Query the database */
            const pastOrders = await Order.find(
                {
                    customerId: castedCustomerId,
                    status: {
                        $eq: OrderStatus.Completed
                    }
                }
            ).populate(
                {
                    model: "Item",
                    path: "items.itemId"
                }
            ).select("vendorId status items total orderTimestamp fulfilledTimestamp isChanged");

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
            req.session.userId = customer._id;
            
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
    req.session.userId = undefined;
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
            /* Insert a new customer into the database's collection */
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
            req.session.userId = newCustomer._id;

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
    clearCart,
    getActiveOrders,
    getCart,
    getPastOrders,
    login,
    logout,
    register
}
