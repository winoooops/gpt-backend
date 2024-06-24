import { Router } from "express";
import {CMCCurrencyQuoteLatestHandler} from "../../../services/coinmarketcap/CMC";

const router = Router();

router.get("/latest", CMCCurrencyQuoteLatestHandler);

export default router;