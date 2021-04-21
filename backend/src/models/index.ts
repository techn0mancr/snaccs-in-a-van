/* Import the required libraries and types */
import { connect, connection } from "mongoose";

/* Import the required secrets */
import { MONGODB_USERNAME, MONGODB_PASSWORD } from "../secrets";

/* Initialize the connection details */
const connectionString = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@snaccs-in-a-van.4ciyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionOptions = {
    dbName: "snaccsInAVan",
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

/* Connect to the database */
connect(connectionString, connectionOptions);
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
import tokenSchema from "./tokenSchema";
import { vendorSchema } from "./vendorModel";

/* Import existing primary interfaces */
import { ICustomer } from "./customerModel";
import { IItem } from "./itemModel";
import { IMenu } from "./menuModel";
import { IOrder } from "./orderModel";
import { IToken } from "./tokenSchema";
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
    tokenSchema,
    vendorSchema,
    
    /* Primary interfaces */
    ICustomer,
    IItem,
    IMenu,
    IOrder,
    IToken,
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
