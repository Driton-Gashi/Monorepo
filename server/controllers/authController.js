import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/userModel.js";

// Register new user
export const registerUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await createUser(name, lastname, email, hashedPassword);

    const token = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.status(201).json({ message: "User registered successfully", userData: jwt.verify(token, process.env.JWT_SECRET ) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Create token with only the user ID (not userData)
    const token = jwt.sign({ id: user.id,name: user.name, lastname: user.lastname,email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Only return the token here
    res.status(200).json({ message: "Login successful", userData: jwt.verify(token,process.env.JWT_SECRET )});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
