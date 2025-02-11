import db from "../db.js";

export const findFoodByName = async (foodName) => {
  const [rows] = await db.execute("SELECT * FROM foods WHERE name = ?", [foodName]);
  return rows[0];
};

export const getAllFoods = async () =>{
  const [rows] = await db.execute("SELECT * FROM foods");
  return rows;
}

export const createFood = async (name, price, category, image_url) => {
  await db.execute(
    "INSERT INTO foods (name, price, category, image_url) VALUES (?, ?, ?, ?)",
    [name, price, category, image_url]
  );
};
