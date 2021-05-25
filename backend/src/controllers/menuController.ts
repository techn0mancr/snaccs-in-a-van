/* Import required types */
import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

/* Import required models */
import { Item, Menu } from "../models";

/* Returns the item details associated with the given itemId */
async function getItemDetails(req: Request & {
    params: { itemId: string }
}, res: Response): Promise<void> {
    /* Validate the inputs */
    await param("itemId")
          .isMongoId()
          .run(req);

    /* Check for any validation errors */
    if (!validationResult(req).isEmpty()) {
        res.status(400).send("Bad Request");
        return;
    }

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
async function getMenu(req: Request & {
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
        
        /* Query the database for the given vendor's menu */
        const menuItems = await Menu.findOne(
            {
                vendorId: castedVendorId
            }
        ).populate(
            {
                "model": "Vendor",
                "path": "vendorId",
                "select": "email name locationDescription isOpen geolocation"
            }
        ).populate(
            {
                model: "Item",
                path: "items.itemId",
            }
        );
       
        /* Check if the query returned anything */
        if (!menuItems || (menuItems.items.length) <= 0) {
            res.status(204).send("No Content");
            return;
        }
        
        res.status(200).json(menuItems);
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
