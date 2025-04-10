// src/routes/userRoutes.ts
import { Router } from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, userController.createUser);
router.get("/:id", authMiddleware, userController.getUserById);
router.get("/", authMiddleware, userController.getUsers);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

export default router;
