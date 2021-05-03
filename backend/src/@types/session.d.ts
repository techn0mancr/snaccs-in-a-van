/* Module augmentation for Express sessions */
import { IItemOrder } from "../src/models";
declare module "express-session" {
    interface SessionData {
        userId: string;
        cart?: Array<IItemOrder>;
    }
}
