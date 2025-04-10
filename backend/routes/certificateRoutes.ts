import { Router } from "express";
import { certificateController } from "../controllers/certificateController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, certificateController.createCertificate);
router.get("/", authMiddleware, certificateController.getCertificates);
router.put("/:id", authMiddleware, certificateController.updateCertificate);
router.delete("/:id", authMiddleware, certificateController.deleteCertificate);

export default router;