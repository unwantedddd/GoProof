import { queryDB, executeDB } from "../db/db.js";
import bcrypt from "bcrypt";

export const updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const existing = await queryDB(
            'SELECT id FROM "User" WHERE email = $1 AND id != $2',
            [email, userId]
        );
        if (existing.length > 0) {
            return res.status(409).json({ message: "Email already in use" });
        }

        await executeDB(
            'UPDATE "User" SET name = $1, email = $2 WHERE id = $3',
            [name, email, userId]
        );

        const updatedUser = await queryDB(
            'SELECT id, name, email FROM "User" WHERE id = $1',
            [userId]
        );

        res.json(updatedUser[0]);
    } catch (error) {
        console.error("Update user info error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All password fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        const users = await queryDB('SELECT password FROM "User" WHERE id = $1', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValid = await bcrypt.compare(currentPassword, users[0].password);
        if (!isValid) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await executeDB('UPDATE "User" SET password = $1 WHERE id = $2', [hashedPassword, userId]);

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};