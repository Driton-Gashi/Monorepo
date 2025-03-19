// import { Request, Response } from "express";
// import { createOrder } from "../models/orderModel";

// export const createNewOrder = async (req: Request, res: Response): Promise<void> => {
//   const { name, description, price, image_url, category_id } = req.body;

//   try {
//     // const existingFood = await getFoodByName(name);
//     // if (existingFood) {
//     //   res.status(400).json({ message: `${name} already exists in the database` });
//     //   return;
//     // }

//     await createOrder(name, description, price, image_url, category_id);
//     res.status(200).json({ message: `${name} - ${price}€ was added successfully` });
//   } catch (error) {
//     handleError(res, error, "Failed to create food");
//   }
// };