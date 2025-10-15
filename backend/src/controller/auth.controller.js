import { queryDB, executeDB } from "../db/db.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const users = await queryDB(
            `SELECT id, email, password, role FROM "User" WHERE email = $1`,
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = users[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password or email" });
        }

        const token = jsonwebtoken.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await queryDB(`SELECT id FROM "User" WHERE email = $1`, [
            email,
        ]);

        if (existing.length > 0) {
            return res
                .status(409)
                .json({ message: "A user with this email is already registered" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        await executeDB(
            `INSERT INTO "User" (name, email, password) VALUES ($1, $2, $3)`,
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logOut = (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        const users = await queryDB(
            `SELECT id, name, email, role FROM "User" WHERE id = $1`,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(users[0]);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};