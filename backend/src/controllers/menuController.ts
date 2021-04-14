/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Menu } from "../models";

/* Gets the menu from a specific van */
async function getMenu(req: Request & {params: {vendorID: string}}, res: Response): Promise<void> {
    const menus = await Menu.find({}).populate("items.itemId", "name price mimetype");
    res.send(menus);
}

async function getItemDetails(req: Request & {params: {itemID: string}}, res: Response): Promise<void> {

}

/* Export functions */
export {
    getMenu,
    getItemDetails
};
