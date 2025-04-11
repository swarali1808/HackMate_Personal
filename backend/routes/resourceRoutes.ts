import { Router } from "express";
import { resourceController } from "../controllers/resourceController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Create a new resource
router.post("/", authMiddleware, resourceController.createResource);

// Get all resources with optional pagination and filtering
router.get("/", authMiddleware, resourceController.getResources);

// Update a resource by ID
router.put("/:id", authMiddleware, resourceController.updateResource);

// Delete a resource by ID
router.delete("/:id", authMiddleware, resourceController.deleteResource);

// Get a resource by slug
router.get("/slug/:slug", authMiddleware, resourceController.getResourceBySlug);

export default router;