import express from "express";
import {CMCCurrencyHandler} from "../services/coinmarketcap/CMC";


const router = express.Router();

router.get("/currency", CMCCurrencyHandler);

export default router;