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

/* Import existing primary schemas */
import { customerSchema } from "./customerModel";
import { itemSchema } from "./itemModel";
import { menuSchema } from "./menuModel";
import { orderSchema } from "./orderModel";
import { vendorSchema } from "./vendorModel";

/* Import existing primary interfaces */
import { ICustomer } from "./customerModel";
import { IItem } from "./itemModel";
import { IMenu } from "./menuModel";
import { IOrder } from "./orderModel";
import { IVendor } from "./vendorModel";

/* Import existing primary models */
import Customer from "./customerModel";
import Item from "./itemModel";
import Menu from "./menuModel";
import Order from "./orderModel";
import Vendor from "./vendorModel";

/* Import existing helper schemas */
import { itemOrderSchema } from "./itemOrderModel";
import { menuItemSchema } from "./menuItemModel";

/* Import existing helper interfaces */
import { IItemOrder } from "./itemOrderModel";
import { IMenuItem } from "./menuItemModel";

/* Import existing helper models */
import ItemOrder from "./itemOrderModel";
import MenuItem from "./menuItemModel";

/* Import existing enums */
import { OrderStatus } from "./orderModel";

/* Re-export existing schemas, interfaces, and models for easy access */
export {
    /* Primary schemas */
    customerSchema,
    itemSchema,
    menuSchema,
    orderSchema,
    vendorSchema,
    
    /* Primary interfaces */
    ICustomer,
    IItem,
    IMenu,
    IOrder,
    IVendor,
    
    /* Primary models */
    Customer,
    Item,
    Menu,
    Order,
    Vendor,

    /* Helper schemas */
    itemOrderSchema,
    menuItemSchema,
    
    /* Helper interfaces */
    IItemOrder,
    IMenuItem,
    
    /* Helper models */
    ItemOrder,
    MenuItem,

    /* Enums */
    OrderStatus
}
