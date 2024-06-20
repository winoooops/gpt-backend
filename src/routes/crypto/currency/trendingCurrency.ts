import { Router } from "express";
import {CMCCurrencyTrendingLatestHandler} from "../../../services/coinmarketcap/CMC";

const router = Router();

router.get("/latest", CMCCurrencyTrendingLatestHandler);

export default router;