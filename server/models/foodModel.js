import db from "../db.js";

export const findFoodByName = async (foodName) => {
  const [rows] = await db.execute("SELECT * FROM foods WHERE name = ?", [foodName]);
  return rows[0];
};

export const getAllFoods = async () =>{
  const [rows] = await db.execute("SELECT * FROM foods");
  return rows;
}

export const getAllCategories = async () =>{
  const [rows] = await db.execute("SELECT * FROM categories");
  return rows;
}

export const createFood = async (name, description, price, image_url, category_id) => {
  await db.execute(
    "INSERT INTO foods (name, description, price, image_url, category_id) VALUES (?, ?, ?, ?, ?)",
    [name, description, price, image_url, category_id]
  );
};
