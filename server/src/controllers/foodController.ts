import {
  getFoodByName,
  createFood,
  getAllFoods,
  getAllCategories,
  getFoodsByCategory,
  deleteFood,
  getFoodFromID,
  updateFood,
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
    let { category_id } = req.query;

    if (!category_id) {
      return res.status(400).json({ message: "Category ID is required" });
    }
    const convertedCategory = parseInt(category_id as string, 10);
    const foods = await getFoodsByCategory(convertedCategory);

    if (!foods) {
      return res
        .status(400)
        .json({ message: "There's no foods with this category" });
    }
    
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const deleteFoodByID = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const foodId = parseInt(id as string, 10);
    if (isNaN(foodId)) {
      return res.status(400).json({ message: "Invalid Food ID" });
    }

    const result = await deleteFood(foodId);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const getFoodByID = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const foodId = parseInt(id as string, 10);

    if (isNaN(foodId)) {
      return res.status(400).json({ message: "Invalid Food ID" });
    }

    const result = await getFoodFromID(foodId);

    return res.status(200).json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const updateFoodByID = async (req: Request, res: Response): Promise<any> => {
  try {
    const {id, name, description, price, category_id, image_url} = req.body;

    const result = await updateFood(id, name, description, price, category_id, image_url);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};