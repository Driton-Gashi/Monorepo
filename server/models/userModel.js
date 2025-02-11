import db from "../db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const createUser = async (name, lastname, email, hashedPassword) => {
  await db.execute(
    "INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)",
    [name, lastname, email, hashedPassword]
  );
};
