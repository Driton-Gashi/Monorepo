import { findFoodByName, createFood, getAllFoods, getAllCategories} from "../models/foodModel.js";

export const createNewFood = async (req, res) => {
  const { name, price, image_url, category_id} = req.body;

  try {
    // Check if food exists
    const existingFoodName = await findFoodByName(name);
    if (existingFoodName) {
      return res.status(400).json({ message: "This food is already registered" });
    }

    // Create user
    await createFood(name, price, image_url, category_id);
    
    res.status(200).json({ message: "Food was added successfuly"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getCategories =async (req, res)=>{

  try{
    const categories = await getAllCategories();
    if (!categories) {
      return res.status(400).json({ message: "There's no categories in database" });
    }

    res.status(200).json(categories)
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }

}

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