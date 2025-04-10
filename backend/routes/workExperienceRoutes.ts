import { Router } from "express";
import { workExperienceController } from "../controllers/workExperienceController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, workExperienceController.createWorkExperience);
router.get("/", authMiddleware, workExperienceController.getWorkExperience);
router.put("/:id", authMiddleware, workExperienceController.updateWorkExperience);
router.delete("/:id", authMiddleware, workExperienceController.deleteWorkExperience);

export default router;