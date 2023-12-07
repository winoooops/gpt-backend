import express, {Request, Response} from 'express';
import {getResponse, getStreamResponse} from "../services/openAiService";

const router = express.Router();

router.post('/chat', async (req: Request,res:Response) => {
	const { prompt } = req.body;

	try {
		const streamResponse$ = await getStreamResponse(prompt);
		let data = "";
		streamResponse$.subscribe(
			partialResponse => {
                 data += partialResponse;
				 console.log(data);
                 res.write(JSON.stringify({type: "success", data}));
				 res.flushHeaders();
			},
			error => {
				console.error(error);
				res.write(JSON.stringify({type: "error", data: error.messsage}));
				res.end();
			},
			() => res.end()
			);
	}
	catch(error: any) {
		console.error(error);
		res.json(error);
		// res
		// 	.status(error.statusCode)
		// 	.json({
		// 			type:"error",
		// 			data: error.message
		// 	});
	}
})

export default router;