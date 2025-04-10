import { Router } from "express";
import { userProjectController } from "../controllers/userProjectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, userProjectController.createUserProject);
router.get("/", authMiddleware, userProjectController.getUserProjects);
router.put("/:id", authMiddleware, userProjectController.updateUserProject);
router.delete("/:id", authMiddleware, userProjectController.deleteUserProject);

export default router;