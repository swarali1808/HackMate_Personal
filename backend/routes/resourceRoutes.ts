import { Router } from "express";
import { resourceController } from "../controllers/resourceController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, resourceController.createResource);
router.get("/", authMiddleware, resourceController.getResources);
router.put("/:id", authMiddleware, resourceController.updateResource);
router.delete("/:id", authMiddleware, resourceController.deleteResource);

export default router;