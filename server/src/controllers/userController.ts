import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, updateUser } from "../models/userModel";
import type { Request, Response } from "express";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, lastname, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertedId = await createUser(name, lastname, email, hashedPassword);
    if (!process.env.JWT_SECRET)
      return res.status(400).json({ message: "JWT_SECRET is Missing" });

    const token = jwt.sign(
      {
        id: insertedId,
        name,
        lastname,
        email,
        address: null,
        city: null,
        phone: null,
        role: "client",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: { message: "empty for now" },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password ?? "");
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    if (!process.env.JWT_SECRET)
      return res.status(400).json({ message: "JWT_SECRET is missing" });

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        city: user.city,
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  if(!process.env.JWT_SECRET) return res.status(400).json({message: "JWT_SECRET missing"})
  const token = req.params.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({user: user})
  } catch (error) {
    console.error("Admin verification error:", error);
    res.status(500).json({ message: "Nah nah nah 🤪 You can't fool me!" });
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, name, lastname, email, address, city, phone } = req.body;

  try {
    // Check if email is being changed and if it's already taken
    if (email) {
      const existingUser = await findUserByEmail(email);
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: "Email already in use." });
      }
    }

    await updateUser(id, name, lastname, email, address, city, phone);

    // Generate new token with updated info
    if (!process.env.JWT_SECRET)
      return res.status(400).json({ message: "JWT_SECRET is missing" });

    const token = jwt.sign(
      {
        id,
        name,
        lastname,
        email,
        address,
        city,
        phone,
        role: "client",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      token: token,
      user: {
        id,
        name,
        email,
        lastname,
        address,
        city,
        phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
