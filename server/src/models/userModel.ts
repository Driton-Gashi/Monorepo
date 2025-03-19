import db from "../db";

// Interface for User object
interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
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

// Find a user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = "SELECT * FROM users WHERE email = ?";
  const rows = await executeQuery(query, [email]);
  return rows[0] || null;
};

// Create a new user
export const createUser = async (
  name: string,
  lastname: string,
  email: string,
  hashedPassword: string
): Promise<void> => {
  const query = `
    INSERT INTO users (name, lastname, email, password)
    VALUES (?, ?, ?, ?)
  `;
  await executeQuery(query, [name, lastname, email, hashedPassword]);
};