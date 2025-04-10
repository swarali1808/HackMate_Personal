import { Router } from "express";
import { taskController } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/:teamId", authMiddleware, taskController.createTask);
router.get("/:teamId", authMiddleware, taskController.getTasks);
router.put("/:id", authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

export default router;