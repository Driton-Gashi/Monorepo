import { findFoodByName, createFood, getAllFoods} from "../models/foodModel.js";

export const createNewFood = async (req, res) => {
  const { name, price, category, image_url} = req.body;

  try {
    // Check if food exists
    const existingFoodName = await findFoodByName(name);
    if (existingFoodName) {
      return res.status(400).json({ message: "This food is already registered" });
    }

    // Create user
    await createFood(name, price, category, image_url);
    
    res.status(200).json({ message: "Food was added successfuly"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getFoods = async (req, res) => {
  try {
    // Check if food exists
    const foods = await getAllFoods();
    if (!foods) {
      return res.status(400).json({ message: "There's no foods in database" });
    }

    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};