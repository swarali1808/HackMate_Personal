import { Router } from "express";
import { skillController } from "../controllers/skillController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, skillController.createSkill);
router.get("/", authMiddleware, skillController.getSkills);
router.delete("/:id", authMiddleware, skillController.deleteSkill);

export default router;