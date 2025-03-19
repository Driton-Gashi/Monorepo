import db from "../db";

export interface Order {
  id?: number;
  user_id: number | null;
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  extra: string;
  created_at?: Date;
}

const executeQuery = async (
  query: string,
  params: any[] = []
): Promise<any> => {
  try {
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

export const createOrder = async (
  user_id: number | null,
  name: string,
  email: string,
  address: string,
  city: string,
  phone: string,
  extra: string
): Promise<void> => {
  let query: string;
    query = `
     INSERT INTO orders (user_id, name, email, address, city, phone, extra)
     VALUES (?, ?, ?, ?, ?);
    `;
    await executeQuery(query, [
      user_id,
      name,
      email,
      address,
      city,
      phone,
      extra,
    ]);

};
