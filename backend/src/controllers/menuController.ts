/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Item, Menu } from "../models";

/* Gets the menu from a specific van */
async function getMenu(req: Request & {params: {vendorId: string}}, res: Response): Promise<void> {
    try {
        /* Query the database */
        var castedVendorId: undefined = (req.params.vendorId as unknown) as undefined;
        const menuItems = await Menu.findOne({vendorId: castedVendorId})
                               .select("items")
                               .populate("items.itemId", "name price mimetype");
        
        /* Send a response */
        if (menuItems) res.status(200).send(menuItems.items);
        else res.status(404).send("Not Found");
    }
    catch (CastError) {
        res.status(400).send("Bad Request");
    }
}

async function getItemDetails(req: Request & {params: {itemId: string}}, res: Response): Promise<void> {
    try {
        /* Query the database */
        const itemDetails = await Item.findById(req.params.itemId)
                                      .select("name price mimetype");
        
        /* Send a response */
        if (itemDetails) res.status(200).send(itemDetails);
        else res.status(404).send("Not Found");
    }
    catch (CastError) {
        res.status(400).send("Bad Request");
    }
}

/* Export functions */
export {
    getMenu,
    getItemDetails
};
