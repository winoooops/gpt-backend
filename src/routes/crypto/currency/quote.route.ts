import { Router } from "express";
import {CMCCurrencyQuoteLatestHandler} from "../../../controllers/crypto/CMCController";

const router = Router();

router.get("/latest", CMCCurrencyQuoteLatestHandler);

export default router;