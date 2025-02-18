import db from "../db";

export const findUserByEmail = async (email: string) => {
  const [rows]: any = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const createUser = async (name: string, lastname: string, email: string, hashedPassword: string) => {
  await db.execute(
    "INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)",
    [name, lastname, email, hashedPassword]
  );
};
