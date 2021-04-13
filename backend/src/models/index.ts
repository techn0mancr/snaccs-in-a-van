/* Import existing schemas */
import tokenSchema from "./tokenSchema";

/* Import existing interfaces */
import ICustomer from "./customerModel";
import IItem from "./itemModel";
import IMenu from "./menuModel";
import IOrder from "./menuModel";
import IVendor from "./vendorModel";

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
    
    /* Interfaces */
    ICustomer,
    IItem,
    IMenu,
    IOrder,
    IVendor,
    
    /* Models */
    Customer,
    Item,
    Menu,
    Order,
    Vendor
}
