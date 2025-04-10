import { Router } from "express";
import { positionController } from "../controllers/positionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, positionController.createPosition);
router.get("/", authMiddleware, positionController.getPositions);
router.put("/:id", authMiddleware, positionController.updatePosition);
router.delete("/:id", authMiddleware, positionController.deletePosition);

export default router;