/* Import required types */
import { Request, Response } from "express";

/* Import required models */
import { Order } from "../models";

/* Adds the given snack to the customer's order */
/* Sends item and quantity (itemorder) and adds it to order */
async function addSnackToOrder(
  req: Request & { params: { itemId: string; quantity: number } },
  res: Response
): Promise<void> {
  try {
    
    /* Create new order */
    // var order = new Order(req.body);
    // const orderSavedToDB = await order.save();

    //Create new order via mongoose create method
    const order = await Order.create(req.body);
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
    /* Fill out order schema */
  } catch (err) {
    res.status(501).json({
      message: err.message,
    });
  }
}

/* Export functions */
export { addSnackToOrder };
