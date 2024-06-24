import { Router } from "express";
import {CMCCurrencyTrendingLatestHandler} from "../../../controllers/crypto/CMCController";

const router = Router();

router.get("/latest", CMCCurrencyTrendingLatestHandler);

export default router;