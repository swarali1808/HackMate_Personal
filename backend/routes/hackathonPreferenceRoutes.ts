import { Router } from "express";
import { hackathonPreferenceController } from "../controllers/hackathonPreferenceController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, hackathonPreferenceController.createOrUpdatePreference);
router.get("/", authMiddleware, hackathonPreferenceController.getPreference);

export default router;