import db from "../db";
import type { User } from "../types/types";

const executeQuery = async (query: string, params: any[] = []): Promise<any> => {
  try {
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = "SELECT * FROM users WHERE email = ?";
  const rows = await executeQuery(query, [email]);
  return rows[0] || null;
};

export const createUser = async (
  name: string,
  lastname: string,
  email: string,
  hashedPassword: string,
): Promise<void> => {
  const query = `
    INSERT INTO users (name, lastname, email, password)
    VALUES (?, ?, ?, ?)
  `;
 const insertedId = await executeQuery(query, [name, lastname, email, hashedPassword]);
 return insertedId.insertId;
};

export const updateUser = async (
  id: number,
  name: string,
  lastname: string,
  email: string,
  address: string,
  city: string,
  phone: string
): Promise<void> => {
  const query = `
    UPDATE users 
    SET name = ?, lastname = ?, email = ?, address = ?, city = ?, phone = ?
    WHERE id = ?
  `;
  await executeQuery(query, [name, lastname, email, address, city, phone, id]);
};