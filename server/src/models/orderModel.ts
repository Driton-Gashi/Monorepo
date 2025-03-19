import db from "../db";

interface OrderItem {
  food_id: number;
  quantity: number;
  price: number;
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
  extra: string,
  items: OrderItem[]
): Promise<void> => {
  try {
    const orderQuery = `
      INSERT INTO orders (user_id, name, email, address, city, phone, extra)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const orderResult = await executeQuery(orderQuery, [
      user_id,
      name,
      email,
      address,
      city,
      phone,
      extra,
    ]);

    // Step 2: Get the ID of the newly inserted order
    const orderId = (orderResult as any).insertId;

    // Step 3: Insert each item into the `order_items` table
    for (const item of items) {
      const itemQuery = `
        INSERT INTO order_items (order_id, food_id, quantity, price)
        VALUES (?, ?, ?, ?);
      `;

      await executeQuery(itemQuery, [
        orderId,
        item.food_id,
        item.quantity,
        item.price,
      ]);
    }

    console.log("Order created successfully with ID:", orderId);
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};