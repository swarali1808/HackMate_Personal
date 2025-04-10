import { Router } from "express";
import { educationController } from "../controllers/educationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, educationController.createEducation);
router.get("/", authMiddleware, educationController.getEducation);
router.put("/:id", authMiddleware, educationController.updateEducation);
router.delete("/:id", authMiddleware, educationController.deleteEducation);

export default router;