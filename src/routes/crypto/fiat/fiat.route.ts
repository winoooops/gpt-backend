import { Router } from "express";
import { CMCFiatHandler } from "../../../services/coinmarketcap/CMC";

const router = Router();

router.get("/", CMCFiatHandler);

export default router;