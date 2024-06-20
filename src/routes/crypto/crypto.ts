import express from "express";
import currency from "./currency/currency";

const router = express.Router();

router.use("/currency", currency);

export default router;