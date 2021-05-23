/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Item, Menu } from "../models";

/* Returns the item details associated with the given itemId */
async function getItemDetails(req: Request & {
    params: {itemId: string}
}, res: Response): Promise<void> {
    try {
        /* Query the database */
        const itemDetails = await Item.findById(req.params.itemId);
        
        /* Check if the query returned anything */
        if (!itemDetails) {
            res.status(404).send("Not Found");
            return;
        }
        
        res.status(200).json(itemDetails);
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Gets the menu of the van associated with the given vendorId */
async function getMenu(req: Request & {params: {vendorId: string}}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        
        /* Query the database for the given vendor's menu */
        const menuItems = await Menu.findOne(
            {
                vendorId: castedVendorId
            }
        ).populate(
            {
                model: "Item",
                path: "items.itemId",
            }
        ).select("items");
       
        /* Check if the query returned anything */
        if (!menuItems || (menuItems.items.length) <= 0) {
            res.status(204).send("No Content");
            return;
        }
        
        res.status(200).json(menuItems.items);
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Export controller functions */
export {
    getItemDetails,
    getMenu
}
