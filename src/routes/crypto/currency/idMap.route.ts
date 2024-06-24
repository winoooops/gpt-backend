import { Router } from "express";
import { CMCCurrencyIDMapHandler } from "../../../controllers/crypto/CMCController";

const router = Router();

router.get("/", CMCCurrencyIDMapHandler);

export default router;