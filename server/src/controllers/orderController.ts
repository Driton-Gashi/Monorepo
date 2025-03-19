import { createOrder } from "../models/orderModel";
import { Request, Response } from "express";

const handleError = (res: Response, error: any, message: string = "Server error") => {
    console.error(error);
    res.status(500).json({ message: `${message}: ${error.message || error}` });
  };

export const createNewOrder = async (req: Request, res: Response): Promise<void> => {
  const { user_id, name, email, address, city, phone, extra, items } = req.body;

  try {
    await createOrder(user_id, name, email, address, city, phone, extra, items );

    res.status(200).json({ message: `Order was created successfully` });

  } catch (error) {
    handleError(res, error, "Failed to create food");
  }
};