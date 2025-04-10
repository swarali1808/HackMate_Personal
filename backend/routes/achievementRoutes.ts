import { Router } from "express";
import { achievementController } from "../controllers/achievementController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, achievementController.createAchievement);
router.get("/", authMiddleware, achievementController.getAchievements);
router.put("/:id", authMiddleware, achievementController.updateAchievement);
router.delete("/:id", authMiddleware, achievementController.deleteAchievement);

export default router;