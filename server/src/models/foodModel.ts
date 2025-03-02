import db from "../db";

export const getFoodsByCategory = async (category_id: number) => {
  const [rows]: any = await db.execute("SELECT * FROM foods WHERE category_id = ?", [category_id]);
  return rows;
};
 
export const getFoodByName = async (foodName: string) => {
  const [rows]: any = await db.execute("SELECT * FROM foods WHERE name = ?", [foodName]);
  return rows[0];
};

export const getFoodFromID = async (id: number) => {
  const [rows]: any = await db.execute("SELECT * FROM foods WHERE food_id = ?", [id]);
  return rows[0];
};

export const getAllFoods = async () =>{
  const [rows] = await db.execute(`
    SELECT foods.food_id, foods.image_url, foods.name, foods.description, foods.price, foods.category_id, categories.name AS category_name
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

export const deleteFood = async (id: number) => {
  const [result]: any = await db.execute("DELETE FROM foods WHERE food_id = ?", [id]);
  
  if (result.affectedRows > 0) {
    return { success: true, message: "Food item deleted successfully." };
  } else {
    return { success: false, message: "No food item found with the specified ID." };
  }
};