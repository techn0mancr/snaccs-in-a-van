/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Customer, IItemOrder, ItemOrder } from "../models";

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

/* Export controller functions */
export {
    addSnackToCart
}
