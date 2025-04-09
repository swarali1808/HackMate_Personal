import { Router } from "express";
import { userBadgeController } from "../controllers/userBadgeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, userBadgeController.assignBadge);
router.get("/:userId", authMiddleware, userBadgeController.getUserBadges);

export default router;