import { Router } from "express";
import trendingCurrency from "./trendingCurrency";

const router = Router();

router.use("/trending", trendingCurrency);

export default router;