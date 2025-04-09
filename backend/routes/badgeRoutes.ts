import { Router } from "express";
import { badgeController } from "../controllers/badgeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, badgeController.createBadge);
router.get("/", authMiddleware, badgeController.getBadges);

export default router;