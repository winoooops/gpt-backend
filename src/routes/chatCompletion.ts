import express, {Request, Response} from 'express';
import {getResponse} from "../services/openAiService";

const router = express.Router();

router.post('/chat', async (req: Request,res:Response) => {
	const prompt = req.body.prompt;

	try {
		const response = await getResponse(prompt);
		res.json({response});
	} catch(error) {
		console.error(error);
		res.status(500).json("Interval Server Error");
	}
})

export default router;