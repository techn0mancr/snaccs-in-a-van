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

/* Import existing schemas */
import itemOrderSchema from "./itemOrderSchema";
import menuItemSchema from "./menuItemSchema";
import tokenSchema from "./tokenSchema";

/* Import existing primary interfaces */
import { ICustomer } from "./customerModel";
import { IItem } from "./itemModel";
import { IMenu } from "./menuModel";
import { IOrder } from "./orderModel";
import { IVendor } from "./vendorModel";

/* Import existing helper interfaces */
import { IItemOrder } from "./itemOrderSchema";
import { IMenuItem } from "./menuItemSchema";

/* Import existing models */
import Customer from "./customerModel";
import Item from "./itemModel";
import Menu from "./menuModel";
import Order from "./orderModel";
import Vendor from "./vendorModel";

/* Re-export existing schemas, interfaces, and models for easy access */
export {
    /* Schemas */
    tokenSchema,
    
    /* Primary interfaces */
    ICustomer,
    IItem,
    IMenu,
    IOrder,
    IVendor,

    /* Helper interfaces */
    IItemOrder,
    IMenuItem,
    
    /* Models */
    Customer,
    Item,
    Menu,
    Order,
    Vendor
}
