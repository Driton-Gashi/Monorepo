import db from "../db";

export const getFoodsByCategory = async (category_id: number) => {
  const [rows]: any = await db.execute("SELECT * FROM foods WHERE category_id = ?", [category_id]);
  return rows;
};
 

export const getFoodByName = async (foodName: string) => {
  const [rows]: any = await db.execute("SELECT * FROM foods WHERE name = ?", [foodName]);
  return rows[0];
};

export const getAllFoods = async () =>{
  const [rows] = await db.execute(`
    SELECT foods.food_id, foods.image_url, foods.name, foods.description, foods.price, categories.name AS category_name
    FROM foods
    JOIN categories ON foods.category_id = categories.id;
`);
  return rows;
}

export const getAllCategories = async () =>{
  const [rows] = await db.execute("SELECT * FROM categories");
  return rows;
}

export const createFood = async (name: string, description: string, price: number, image_url: string, category_id: number) => {
  await db.execute(
    "INSERT INTO foods (name, description, price, image_url, category_id) VALUES (?, ?, ?, ?, ?)",
    [name, description, price, image_url, category_id]
  );
};
