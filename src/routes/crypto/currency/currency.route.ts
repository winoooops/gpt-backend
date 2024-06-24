import { Router } from "express";
import trendingCurrency from "./trending.route";
import idMapRoute from "./idMap.route";
import quoteRoute from "./quote.route";

const router = Router();

router.use("/trending", trendingCurrency);
router.use("/quote", quoteRoute);
router.use("/map", idMapRoute);

export default router;