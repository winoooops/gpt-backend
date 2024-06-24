import { Router } from "express";
import { CMCFiatHandler } from "../../../controllers/crypto/CMCController";

const router = Router();

router.get("/", CMCFiatHandler);

export default router;