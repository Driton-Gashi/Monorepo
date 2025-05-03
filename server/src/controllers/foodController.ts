import {
  getFoodByName,
  createFood,
  getAllFoods,
  getAllCategories,
  getFoodsByCategory,
  deleteFood,
  getFoodById,
  updateFood,
  createCategory,
  getCategoryByName,
  deleteCategory,
} from "../models/foodModel";
import { Request, Response } from "express";

const handleError = (res: Response, error: any, message: string = "Server error") => {
  console.error(error);
  res.status(500).json({ message: `${message}: ${error.message || error}` });
};

export const createNewFood = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, image_url, category_id } = req.body;

  try {
    const existingFood = await getFoodByName(name);
    if (existingFood) {
      res.status(409).json({ message: `${name} already exists in the database` });
      return;
    }

    await createFood(name, description, price, image_url, category_id);
    res.status(200).json({ message: `${name} - ${price}€ was added successfully` });
  } catch (error) {
    handleError(res, error, "Failed to create food");
  }
};

export const createNewCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  try {
    const existingCategory = await getCategoryByName(name);
    if (existingCategory) {
      res.status(400).json({ message: `${name} category already exists` });
      return;
    }

    await createCategory(name);
    res.status(200).json({ message: `${name} category was added successfully` });
  } catch (error) {
    handleError(res, error, "Failed to create category");
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getAllCategories();
    if (!categories || categories.length === 0) {
      res.status(200).json({ message: "No categories found in the database" });
      return;
    }

    res.status(200).json(categories);
  } catch (error) {
    handleError(res, error, "Failed to fetch categories");
  }
};

export const getFoods = async (req: Request, res: Response): Promise<void> => {
  try {
    const foods = await getAllFoods();

    if (!foods || foods.length === 0) {
      res.status(200).json({ message: "No food items found in the database" });
      return;
    }
    
    res.status(200).json(foods);
  } catch (error) {
    handleError(res, error, "Failed to fetch food items");
  }
};

export const getFoodsByCategoryId = async (req: Request, res: Response): Promise<void> => {
  const { categoryId } = req.params;

  try {
    if (!categoryId) {
      res.status(400).json({ message: "Category ID is required" });
      return;
    }

    const convertedCategoryId = parseInt(categoryId, 10);
    if (isNaN(convertedCategoryId)) {
      res.status(400).json({ message: "Invalid Category ID" });
      return;
    }

    const foods = await getFoodsByCategory(convertedCategoryId);
    if (!foods || foods.length === 0) {
      res.status(404).json({ message: "No food items found for this category" });
      return;
    }

    res.status(200).json(foods);
  } catch (error) {
    handleError(res, error, "Failed to fetch food items by category");
  }
};

export const deleteFoodByID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json({ message: "Food ID is required" });
      return;
    }

    const foodId = parseInt(id, 10);
    if (isNaN(foodId)) {
      res.status(400).json({ message: "Invalid Food ID" });
      return;
    }

    const result = await deleteFood(foodId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    handleError(res, error, "Failed to delete food item");
  }
};

export const deleteCategoryByID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json({ message: "Category ID is required" });
      return;
    }

    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      res.status(400).json({ message: "Invalid Category ID" });
      return;
    }

    const result = await deleteCategory(categoryId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    handleError(res, error, "Failed to delete category");
  }
};

export const getFoodByID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json({ message: "Food ID is required" });
      return;
    }

    const foodId = parseInt(id, 10);
    if (isNaN(foodId)) {
      res.status(400).json({ message: "Invalid Food ID" });
      return;
    }

    const food = await getFoodById(foodId);
    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    res.status(200).json(food);
  } catch (error) {
    handleError(res, error, "Failed to fetch food item");
  }
};

export const updateFoodByID = async (req: Request, res: Response): Promise<void> => {
  const { id, name, description, price, category_id, image_url } = req.body;

  try {
    if (!id || !name || !description || !price || !category_id || !image_url) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const result = await updateFood(id, name, description, price, category_id, image_url);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error, "Failed to update food item");
  }
};