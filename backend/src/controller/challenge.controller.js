import { queryDB, executeDB } from "../db/db.js";

export const createChallenge = async (req, res) => {
    try {
        const { title, description, start_date, end_date, status } = req.body;

        if (!title || !start_date || !end_date) {
            return res.status(400).json({ message: "Title, start_date, and end_date are required" });
        }

        const newChallenge = await queryDB(
            `INSERT INTO "challenge" (title, description, start_date, end_date, status) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [title, description, start_date, end_date, status || 'active']
        );

        res.status(201).json(newChallenge[0]);
    } catch (error) {
        console.error("Create challenge error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllChallenges = async (req, res) => {
    try {
        const challenges = await queryDB('SELECT * FROM "challenge" ORDER BY start_date DESC');
        res.json(challenges);
    } catch (error) {
        console.error("Get all challenges error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getChallengeById = async (req, res) => {
    try {
        const { id } = req.params;
        const challenge = await queryDB('SELECT * FROM "challenge" WHERE id = $1', [id]);

        if (challenge.length === 0) {
            return res.status(404).json({ message: "Challenge not found" });
        }

        res.json(challenge[0]);
    } catch (error) {
        console.error("Get challenge by ID error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateChallenge = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, start_date, end_date, status } = req.body;

        if (!title || !start_date || !end_date || !status) {
            return res.status(400).json({ message: "All fields are required for update" });
        }
        
        const existing = await queryDB('SELECT id FROM "challenge" WHERE id = $1', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: "Challenge not found" });
        }

        await executeDB(
            `UPDATE "challenge" 
             SET title = $1, description = $2, start_date = $3, end_date = $4, status = $5 
             WHERE id = $6`,
            [title, description, start_date, end_date, status, id]
        );

        const updatedChallenge = await queryDB('SELECT * FROM "challenge" WHERE id = $1', [id]);

        res.json(updatedChallenge[0]);
    } catch (error) {
        console.error("Update challenge error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteChallenge = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedChallenge = await queryDB(
            'DELETE FROM "challenge" WHERE id = $1 RETURNING *', 
            [id]
        );

        if (deletedChallenge.length === 0) {
            return res.status(404).json({ message: "Challenge not found" });
        }

        res.json({ message: "Challenge deleted successfully", challenge: deletedChallenge[0] });
    } catch (error) {
        console.error("Delete challenge error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};