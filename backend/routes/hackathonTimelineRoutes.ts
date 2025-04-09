import { Router } from "express";
import { hackathonTimelineController } from "../controllers/hackathonTimelineController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/:hackathonId/timeline", authMiddleware, hackathonTimelineController.addTimelineEvent);
router.get("/:hackathonId/timeline", authMiddleware, hackathonTimelineController.getTimeline);
router.put("/timeline/:id", authMiddleware, hackathonTimelineController.updateTimelineEvent);
router.delete("/timeline/:id", authMiddleware, hackathonTimelineController.deleteTimelineEvent);

export default router;