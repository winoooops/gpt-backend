import express from "express";
import fiatRoute from "./fiat/fiat.route";
import currencyRoute from "./currency/currency.route";

const router = express.Router();

router.use("/currency", currencyRoute);
router.use("/fiat", fiatRoute)

export default router;