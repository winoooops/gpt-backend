import { Router } from "express";
import trendingCurrency from "./trending.route";
import idMapRoute from "./idMap.route";

const router = Router();

router.use("/trending", trendingCurrency);
router.use("/map", idMapRoute);

export default router;