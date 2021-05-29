/* Import required libraries and types */
import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { passwordSchema } from "../models";

/* Import required constants and models */
import {
    ORDER_AMENDMENT_TIME_WINDOW
} from "../config";

import {
    Customer, ICustomer,
    Item,
    ItemOrder, IItemOrder,
    Menu,
    IMenuItem,
    Order, IOrder,
    OrderRating,
    OrderStatus,
    Vendor
} from "../models";

/* Amends the current customer's profile details */
async function amendProfileDetails(req: Request & {
    body: { email: string, givenName: string, familyName: string, password: string }
}, res: Response): Promise<void> {
    /* Validate and sanitize the inputs */
    if (req.body.email)
        await body("email")
              .isEmail()
              .trim().escape()
              .run(req);
    if (req.body.givenName)
        await body("givenName")
              .isAlpha()
              .trim()
              .run(req);
    if (req.body.familyName)
        await body("familyName")
              .isAlpha()
              .trim()
              .run(req);
    if (req.body.password)
        await body("password")
              .isAscii().isLength({ min: 8 })
              .run(req);
    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }
    
    try {
        /* Query the database for the current customer's details */
        const currentCustomer = await Customer.findById(req.session.customerId);
        if (!currentCustomer) {
            res.status(404).send("Not Found");
            return;
        }

        /* Check if the customer wants to change his email */
        if (req.body.email) {
            /* Check if the email is already used by another customer */
            const existingCustomer = await Customer.findOne(
                {
                    email: req.body.email.toLowerCase()
                }
            );
            if (existingCustomer) {
                res.status(403).send("Forbidden");
                return;
            }
            
            /* Update the customer's email */
            currentCustomer.email = req.body.email.toLowerCase();
        }

        /* Check if the customer wants to change his given name */
        if (req.body.givenName)
            currentCustomer.givenName = req.body.givenName;

        /* Check if the customer wants to change his family name */
        if (req.body.familyName)
            currentCustomer.familyName = req.body.familyName;

        /* Check if the customer wants to change his password */
        if (req.body.password) {
            /* Validate the customer's new password */
            if (!passwordSchema.validate(req.body.password)) {
                res.status(403).send("Forbidden");
                return;
            }
            
            /* Update the customer's password */
            currentCustomer.password = req.body.password;
        }
        
        await currentCustomer.save();
        
        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        console.log(`(Customer) amendProfileDetails(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Cancels the customer's given order */
async function cancelOrder(req: Request & {
    params: { orderId: string }
}, res: Response): Promise<void> {
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
        
        /* Check if the order exists and is made by the current customer  */
        const orderToCancel = await Order.findOne(
            {
                _id: castedOrderId,
                customerId: req.session.customerId
            }
        );
        if (!orderToCancel) {
            res.status(403).send("Forbidden");
            return;
        }

        /* Check if a certain amount of time has passed since placement */
        var deltaSincePlaced: number =
            (new Date()).getTime() - orderToCancel.timestamps.placed.getTime();
        if (deltaSincePlaced > ORDER_AMENDMENT_TIME_WINDOW) {
            res.status(403).send("Forbidden");
            return;
        }
        
        /* Update the order details */
        orderToCancel.status = OrderStatus.Cancelled;
        orderToCancel.timestamps.completed = new Date();
        await orderToCancel.save();

        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        console.log(`(Customer) cancelOrder(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Cancels the order amendment process */
async function cancelOrderAmendment(req: Request & {
    params: { orderId: string }
}, res: Response): Promise<void> {
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
        
        /* Check if the order to be amended exists and is made by the current customer */
        const orderToAmend = await Order.findOne(
            {
                _id: castedOrderId,
                customerId: req.session.customerId
            }
        );
        if (!orderToAmend) {
            res.status(403).send("Forbidden");
            return;
        }
        
        /* Query the database for the current customer's details */
        const currentCustomer = await Customer.findById(req.session.customerId);
        if (!currentCustomer) {
            res.status(403).send("Forbidden");
            return;
        }
        
        /* Replace the session cart contents with the customer's saved cart */
        req.session.cart = currentCustomer.cart;

        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        console.log(`(Customer) cancelOrderAmendment(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Checks out the customer's current cart */
async function checkoutCart(req: Request, res: Response): Promise<void> {
    try {
        /* Ensures that a vendor has been selected and the cart is populated */
        if (!req.session.vendorId ||
            !req.session.cart || (req.session.cart.length <= 0)) {
            res.status(403).send("Forbidden");
            return;
        }
        
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
    catch (e) {
        console.log(`(Customer) checkoutCart(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Edits the amount of the given item in the customer's cart by the given quantity */
async function editCartItem(req: Request & {
    params: { itemId: string },
    body: { quantity: number }
}, res: Response): Promise<void> {
    /* Validate and sanitize the inputs */
    await param("itemId")
          .isMongoId()
          .run(req);
    await body("quantity")
          .isInt()
          .toInt()
          .run(req);

    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }

    try {
        /* Ensure that the customer's cart exists */
        if (!req.session.cart)
            req.session.cart = [];
        
        /* Ensures that a vendor has been selected */
        if (!req.session.vendorId) {
            res.status(403).send("Forbidden");
            return;
        }

        /* Cast the ObjectIds */
        var castedItemId: undefined = (req.params.itemId as unknown) as undefined;
        
        /* Check the existence of the selected vendor's menu */
        const menuDetails = await Menu.findOne(
            {
                vendorId: req.session.vendorId
            }
        );
        if (!menuDetails) {
            res.status(403).send("Forbidden");
            return;
        }

        /* Check the existence of the item in the database and selected vendor's menu */
        const existingItem = await Item.findById(castedItemId);
        if (!existingItem ||
            !menuDetails.items.some((menuItem: IMenuItem) => menuItem.itemId.equals(castedItemId))) {
            res.status(404).send("Not Found");
            return;
        }

        /* Check if an item order of the given itemId already exists in the cart */
        var itemOrderIndex = req.session.cart.findIndex((itemOrder: IItemOrder) => itemOrder.itemId.equals(castedItemId));
        if (itemOrderIndex > -1) {
            /* Update the existing item order */
            ((req.session.cart)[itemOrderIndex]).quantity += req.body.quantity;
            ((req.session.cart)[itemOrderIndex]).subtotal += existingItem.price * req.body.quantity;

            /* Remove the item order if its new quantity is zero or less */
            if (((req.session.cart)[itemOrderIndex]).quantity <= 0)
                req.session.cart.splice(itemOrderIndex, 1);
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
            if (req.body.quantity > 0)
                req.session.cart.push(newItemOrder);
        }
        
        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        console.log(`(Customer) editCartItem(): ${e.message}`);
        res.status(500).send("Internal Server Error");
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
        
        /* Check if the order to be amended exists and is made by the current customer */
        const orderToAmend = await Order.findOne(
            {
                _id: castedOrderId,
                customerId: req.session.customerId
            }
        );
        if (!orderToAmend) {
            res.status(403).send("Forbidden");
            return;
        }
        
        /* Check if the cart is empty */
        if (!req.session.cart || (req.session.cart.length <= 0)) {
            res.status(403).send("Forbidden");
            return;
        }

        /* Empty the order items */
        const qResult = await Order.updateOne(
            {
                _id: castedOrderId
            },
            {
                $set: {
                    items: []
                }
            }
        );
        
        /* Calculate the new cart item */
        var cartTotal: number = 0;
        req.session.cart.forEach((itemOrder: IItemOrder) => {
            orderToAmend.items.push(itemOrder);  // replace the order items with the items in the session cart
            cartTotal += itemOrder.subtotal;     // calculate the cart's total
        });
        
        /* Update the order details */
        orderToAmend.total = cartTotal;
        orderToAmend.timestamps.placed = new Date();
        orderToAmend.isChanged = true;
        await orderToAmend.save();
        
        /* Replace the session cart contents with the customer's saved cart */
        const currentCustomer = await Customer.findById(req.session.customerId);
        if (currentCustomer)
            req.session.cart = currentCustomer.cart;

        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        console.log(`(Customer) finalizeOrderAmendment(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Returns the logged in customer's active orders */
async function getActiveOrders(req: Request, res: Response): Promise<void> {
    try {
        /* Query the database for the current customer's placed and fulfilled orders */
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
        ).select("vendorId status items total timestamps isChanged");

        /* Check if the query returned anything */
        if (!activeOrders || (activeOrders.length <= 0)) {
            res.status(204).send("No Content");
            return;
        }

        res.status(200).json(activeOrders);
    }
    catch (e) {
        console.log(`(Customer) getActiveOrders(): ${e.message}`);
        res.status(500).send("Internal Server Error");
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
        /* Query the database for the current customer's completed or cancelled orders */
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
        ).select("vendorId status items total timestamps isChanged");

        /* Check if the query returned anything */
        if (!pastOrders || (pastOrders.length <= 0)) {
            res.status(204).send("No Content");
            return;
        }

        res.status(200).json(pastOrders);
    }
    catch (e) {
        console.log(`(Customer) getPastOrders(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Returns the profile of the current logged-in customer */
async function getProfile(req: Request, res: Response) {
    try {
        /* Query the database for the current customer's details */
        const customerDetails = await Customer.findById(req.session.customerId)
                                              .select("email givenName familyName");
        if (!customerDetails) {
            res.status(404).send("Not Found");
            return;
        }
        
        res.status(200).json(customerDetails);
    }
    catch (e) {
        console.log(`(Customer) getProfile(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Begin the order amendment process */
async function initializeOrderAmendment(req: Request & {
    params: { orderId: string }
}, res: Response): Promise<void> {
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
        
        /* Check if the order is made by the current customer within a certain amount of time  */
        const orderToAmend = await Order.findOne(
            {
                _id: castedOrderId,
                customerId: req.session.customerId
            }
        );
        if (!orderToAmend) {
            res.status(403).send("Forbidden");
            return;
        }
        
        /* Check if a certain amount of time has passed since placement */
        var deltaSincePlaced: number =
            (new Date()).getTime() - orderToAmend.timestamps.placed.getTime();
        if (deltaSincePlaced > ORDER_AMENDMENT_TIME_WINDOW) {
            res.status(403).send("Forbidden");
            return;
        }

        /* Check if the current customer is valid */
        const currentCustomer = await Customer.findById(req.session.customerId);
        if (!currentCustomer) {
            res.status(403).send("Forbidden");
            return;
        }

        /* Check if the current cart is empty */
        if (!req.session.cart || (req.session.cart.length <= 0)) {
            res.status(403).send("Forbidden");
            return;
        }

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
        req.session.cart.forEach((itemOrder: IItemOrder) => currentCustomer.cart.push(itemOrder));
        await currentCustomer.save();
        
        /* Replace the session cart with the order items */
        req.session.cart = orderToAmend.items;
        
        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        console.log(`(Customer) initializeOrderAmendment(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Logs a customer in */
async function login(req: Request & {
    body: { email: String, password: String }
}, res: Response): Promise<void> {
    /* Validate and sanitize the inputs */
    await body("email")
          .isEmail()
          .trim().escape()
          .run(req);
    await body("password")
          .isAscii().isLength({ min: 8 })
          .run(req);
    
    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }

    try {
        /* Check if a customer with the given email exists */
        const customer = await Customer.findOne(
            {
                email: req.body.email.toLowerCase()
            }
        );

        /* Verify the customer's credentials */
        if (!(customer && compareSync(req.body.password, customer.password))) {
            res.status(403).send("Incorrect email/password!");
            return;
        }
        
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
    catch (e) {
        console.log(`(Customer) login(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Logs a customer out */
async function logout(req: Request, res: Response): Promise<void> {
    /* Store the current customer's cart in the database */
    try {
        /* Check if the current customer has items stored in his session cart */
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
        console.log(`(Customer) logout(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Submits a rating for a completed order */
async function rateOrder(req: Request & {
    params: { orderId: string },
    body: { rating: number, comments: string }
}, res: Response): Promise<void> {
    /* Validate and sanitize the inputs */
    await param("orderId")
          .isMongoId()
          .run(req);
    await body("rating")
          .isInt({ min: 1, max: 5 })
          .toInt()
          .run(req);
    await body("comments")
          .isAscii()
          .trim()
          .run(req);

    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }
    
    try {
        /* Check if the order is already completed and made by the current customer */
        const orderToRate = await Order.findOne(
            {
                _id: req.params.orderId,
                customerId: req.session.customerId,
                status: OrderStatus.Completed
            }
        );
        if (!orderToRate) {
            res.status(403).send("Forbidden");
            return;
        }
        
        /* Submit the rating */
        orderToRate.rating = new OrderRating({
            overall: req.body.rating,
            comments: req.body.comments
        });
        await orderToRate.save();

        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        console.log(`(Customer) rateOrder(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Registers a new customer */
async function register(req: Request & {
    body: { email: String, givenName: String, familyName: String, password: String }
}, res: Response): Promise<void> {
    /* Validate and sanitize the inputs */
    await body("email")
          .isEmail()
          .trim().escape()
          .run(req);
    await body("givenName")
          .isAlpha()
          .trim()
          .run(req);
    await body("familyName")
          .isAlpha()
          .trim()
          .run(req);
    await body("password")
          .isAscii().isLength({ min: 8 })
          .run(req);

    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }
    
    try {
        /* Validate the given password */
        if (!passwordSchema.validate(req.body.password)) {
            res.status(403).send("Forbidden");
            return;
        }

        /* Check if the email is already used by an existing customer */
        const existingCustomer = await Customer.findOne(
            {
                email: req.body.email.toLowerCase()
            }
        );
        if (existingCustomer) {
            res.status(403).send("Forbidden");
            return;
        }
        
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
    catch (e) {
        console.log(`(Customer) register(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Selects the given vendor */
async function selectVendor(req: Request & {
    params: { vendorId: string }
}, res: Response): Promise<void> {
    /* Validate the inputs */
    await param("vendorId")
          .isMongoId()
          .run(req);

    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }
    
    try {
        /* Cast the ObjectIds */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        
        /* Check if a vendor with the given ID is valid */
        const vendor = await Vendor.findById(castedVendorId);
        if (!vendor) {
            res.status(404).send("Not Found");
            return;
        }
        
        /* Update the session data */
        req.session.vendorId = castedVendorId;
        
        /* Send a response */
        res.status(200).send("OK");
    }
    catch (e) {
        console.log(`(Customer) selectVendor(): ${e.message}`);
        res.status(500).send("Internal Server Error");
    }
}

/* Export controller functions */
export {
    amendProfileDetails,
    cancelOrder,
    cancelOrderAmendment,
    checkoutCart,
    editCartItem,
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
    selectVendor
}
