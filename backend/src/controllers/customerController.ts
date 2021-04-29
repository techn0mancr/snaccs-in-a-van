/* Import required types */
import { compareSync } from "bcrypt";
import { Request, Response } from "express";

/* Import required models */
import { Customer, ICustomer, IItemOrder, ItemOrder } from "../models";

/* Adds the given snack, in the given quantity, to the customer's cart */
async function addSnackToCart(req: Request & {
    params: { itemId: string },
    body: { customerId: string, quantity: number }
}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedItemId: undefined = (req.params.itemId as unknown) as undefined;
        var castedCustomerId: undefined = (req.body.customerId as unknown) as undefined;
    
        /* Create an item order */
        var itemOrder: IItemOrder = new ItemOrder(
            {
                itemId: castedItemId,
                quantity: req.body.quantity
            }
        );

        /* Append the item order to the customer's cart */
        const qResult = await Customer.updateOne(
            {
                _id: castedCustomerId
            },
            {
                $push: {
                    cart: itemOrder
                }
            });

        /* Check if the query has successfully executed */
        if (qResult.ok == 1) {
            if (qResult.n > 0 && qResult.nModified > 0 && qResult.n == qResult.nModified) {
                res.status(200).send("OK");
            }
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
}, res: Response) {
    try {
        /* Check if a user with the given email exists */
        const customer = await Customer.findOne(
            {
                email: req.body.email
            }
        );
        if (customer && compareSync(req.body.password, customer.password)) {
            res.status(400).send("Incorrect email/password!");
        }
        else {
            /* Generate a token for the logged-in customer */
            // TODO
        }
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Registers a new customer */
async function register(req: Request & {
    body: { email: String, givenName: String, familyName: String, password: String }
}, res: Response) {
    try {
        /* Insert a new customer into its collection */
        const newCustomer: ICustomer = new Customer(
            {
                email: req.body.email,
                givenName: req.body.givenName,
                familyName: req.body.familyName,
                password: req.body.password
            }
        );
        await newCustomer.save();

        /* Generate a token for the new customer */
        // TODO

        /* Send a response */
        res.status(201).send("");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Export controller functions */
export {
    addSnackToCart,
    login,
    register
}
