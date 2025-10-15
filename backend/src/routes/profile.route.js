import express from "express";
import { updateUserInfo, changePassword } from "../controller/profile.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.put("/update", updateUserInfo);

router.put("/change-password", changePassword);

export default router;