import {
  getFoodByName,
  createFood,
  getAllFoods,
  getAllCategories,
  getFoodsByCategory,
} from "../models/foodModel";
import { Request, Response } from "express";

export const createNewFood = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, description, price, image_url, category_id } = req.body;
  try {
    // Check if food exists
    const existingFoodName = await getFoodByName(name);
    if (existingFoodName) {
      return res
        .status(400)
        .json({ message: `${name} already exists in database` });
    }

    // Create user
    await createFood(name, description, price, image_url, category_id);

    res
      .status(200)
      .json({ message: `${name} - ${price}€ was added successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await getAllCategories();
    if (!categories) {
      return res
        .status(400)
        .json({ message: "There's no categories in database" });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const getFoods = async (req: Request, res: Response): Promise<any> => {
  try {
    const foods = await getAllFoods();
    if (!foods) {
      return res.status(400).json({ message: "There's no food in database" });
    }

    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const getFoodsByCategoryId = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {category_id} = req.body
    const foods = await getFoodsByCategory(category_id);
    if (!foods) {
      return res.status(400).json({ message: "There's no foods with this category" });
    }
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
};
