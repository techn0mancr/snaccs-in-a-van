/* Module augmentation for Express sessions */
import { IItemOrder } from "../src/models";
declare module "express-session" {
    interface SessionData {
        customerId: string;
        vendorId: string;
        cart: Array<IItemOrder>;
    }
}
