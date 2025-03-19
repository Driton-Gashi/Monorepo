import db from "../db";

// Interfaces
interface Food {
  food_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
}

// Helper function for executing queries and handling errors
const executeQuery = async (query: string, params: any[] = []): Promise<any> => {
  try {
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

// Food-related functions
export const getAllFoods = async (): Promise<Food[]> => {
  const query = `
    SELECT foods.food_id, foods.image_url, foods.name, foods.description, foods.price, foods.category_id, categories.name AS category_name
    FROM foods
    JOIN categories ON foods.category_id = categories.id;
  `;
  return executeQuery(query);
};

export const getFoodById = async (id: number): Promise<Food | null> => {
  const query = "SELECT * FROM foods WHERE food_id = ?";
  const rows = await executeQuery(query, [id]);
  return rows[0] || null;
};

export const getFoodsByCategory = async (categoryId: number): Promise<Food[]> => {
  const query = "SELECT * FROM foods WHERE category_id = ?";
  return executeQuery(query, [categoryId]);
};

export const getFoodByName = async (foodName: string): Promise<Food | null> => {
  const query = "SELECT * FROM foods WHERE name = ?";
  const rows = await executeQuery(query, [foodName]);
  return rows[0] || null;
};

export const createFood = async (
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  categoryId: number
): Promise<void> => {
  const query = `
    INSERT INTO foods (name, description, price, image_url, category_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  await executeQuery(query, [name, description, price, imageUrl, categoryId]);
};

export const updateFood = async (
  id: number,
  name: string,
  description: string,
  price: number,
  categoryId: number,
  imageUrl: string
): Promise<{ success: boolean; message: string }> => {
  const query = `
    UPDATE foods
    SET name = ?, description = ?, price = ?, image_url = ?, category_id = ?
    WHERE food_id = ?
  `;
  const result = await executeQuery(query, [name, description, price, imageUrl, categoryId, id]);

  if (result.affectedRows > 0) {
    return { success: true, message: "Food was updated successfully." };
  } else {
    return { success: false, message: "Food wasn't updated, please try again later!" };
  }
};

export const deleteFood = async (id: number): Promise<{ success: boolean; message: string }> => {
  const query = "DELETE FROM foods WHERE food_id = ?";
  const result = await executeQuery(query, [id]);

  if (result.affectedRows > 0) {
    return { success: true, message: "Food item deleted successfully." };
  } else {
    return { success: false, message: "No food item found with the specified ID." };
  }
};

// Category-related functions
export const getAllCategories = async (): Promise<Category[]> => {
  const query = "SELECT * FROM categories";
  return executeQuery(query);
};

export const getCategoryByName = async (categoryName: string): Promise<Category | null> => {
  const query = "SELECT * FROM categories WHERE name = ?";
  const rows = await executeQuery(query, [categoryName]);
  return rows[0] || null;
};

export const createCategory = async (name: string): Promise<void> => {
  const query = "INSERT INTO categories (name) VALUES (?)";
  await executeQuery(query, [name]);
};

export const deleteCategory = async (id: number): Promise<{ success: boolean; message: string }> => {
  const query = "DELETE FROM categories WHERE id = ?";
  const result = await executeQuery(query, [id]);

  if (result.affectedRows > 0) {
    return { success: true, message: "Category was deleted successfully." };
  } else {
    return { success: false, message: "Category couldn't be deleted, please try again later!" };
  }
};