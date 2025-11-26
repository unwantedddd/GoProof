import express from "express";
import { 
    createChallenge, 
    getAllChallenges, 
    getChallengeById, 
    updateChallenge, 
    deleteChallenge 
} from "../controller/challenge.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllChallenges);
router.get("/:id", getChallengeById);

router.post("/", authMiddleware, createChallenge);

router.put("/:id", authMiddleware, updateChallenge);

router.delete("/:id", authMiddleware, deleteChallenge);


export default router;