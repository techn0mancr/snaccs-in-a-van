/* Import the required libraries and types */
import { connect, connection } from "mongoose";

/* Import the required constants */
import { MONGODB_CONNECTION_STRING, MONGODB_CONNECTION_OPTIONS } from "../config";

/* Connect to the database */
connect(MONGODB_CONNECTION_STRING, MONGODB_CONNECTION_OPTIONS);
const db = connection;

/* Handle server connection events */
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
    console.log("Successfully connected to MongoDB database.");
});

/* Re-export primary interfaces, schemas, and models */
export { ICustomer, customerSchema, default as Customer } from "./customerModel";
export { IItem, itemSchema, default as Item } from "./itemModel";
export { IMenu, menuSchema, default as Menu } from "./menuModel";
export { IOrder, orderSchema, default as Order } from "./orderModel";
export { IVendor, vendorSchema, default as Vendor } from "./vendorModel";

/* Re-export helper interfaces, schemas, and models */
export { IItemOrder, itemOrderSchema, default as ItemOrder } from "./itemOrderModel";
export { IMenuItem, menuItemSchema, default as MenuItem } from "./menuItemModel";
export { IOrderRating, orderRatingSchema, default as OrderRating } from "./orderRatingModel";
export { IOrderTimestamps, orderTimestampsSchema, default as OrderTimestamps } from "./orderTimestampsModel";
export { default as passwordSchema } from "./passwordSchema";

/* Re-export helper enums */
export { OrderStatus } from "./orderModel";
