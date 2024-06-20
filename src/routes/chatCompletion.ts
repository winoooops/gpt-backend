import express, {Request, Response} from 'express';
import {SupabaseMessage} from "../types/supabase";
import {corcelTextHandler} from "../services/corcel/Corcel";

const router = express.Router();

router.post('/reply', corcelTextHandler);

export default router;