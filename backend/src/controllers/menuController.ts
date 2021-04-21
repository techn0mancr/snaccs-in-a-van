/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Item, Menu } from "../models";

/* Gets the menu from a specific van */
async function getMenu(req: Request & {params: {vendorId: string}}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        
        /* Query the database */
        const menuItems = await Menu.findOne(
            {
                vendorId: castedVendorId
            }
        ).select("items").populate("items.itemId", "name price mimetype");
        
        /* Send the query results */
        if (menuItems) {
            if (menuItems.items.length > 0)
                res.status(200).json(menuItems.items);
            else
                res.status(204).send("No Content");
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

async function getItemDetails(req: Request & {params: {itemId: string}}, res: Response): Promise<void> {
    try {
        /* Query the database */
        const itemDetails = await Item.findById(req.params.itemId)
                                      .select("name price mimetype");
        
        /* Send the query results */
        if (itemDetails)
            res.status(200).json(itemDetails);
        else
            res.status(404).send("Not Found");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Export controller functions */
export {
    getMenu,
    getItemDetails
};
