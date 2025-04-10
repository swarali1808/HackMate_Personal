import { Router } from "express";
import { projectController } from "../controllers/projectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, projectController.createProject);
router.get("/:id", authMiddleware, projectController.getProjectById);
router.get("/", authMiddleware, projectController.getProjects);
router.put("/:id", authMiddleware, projectController.updateProject);
router.delete("/:id", authMiddleware, projectController.deleteProject);

export default router;