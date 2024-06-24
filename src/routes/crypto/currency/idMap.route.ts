import { Router } from "express";
import { CMCCurrencyIDMapHandler } from "../../../services/coinmarketcap/CMC";

const router = Router();

router.get("/", CMCCurrencyIDMapHandler);

export default router;