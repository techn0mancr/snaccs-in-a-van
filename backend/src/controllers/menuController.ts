
/* Import required types */
import { Request, Response } from "express";

/* Gets the menu from a specific van */
function getMenu(req: Request & {params: {vendorID: string}}, res: Response): void {
    
}

function getItemDetails(req: Request & {params: {itemID: string}}, res: Response): void {

}

/* Export functions */
export {
    getMenu,
    getItemDetails
};
