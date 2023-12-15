import express, {Request, Response} from 'express';
import {getChatCompletion, getStreamResponse} from "../services/openAi.service";

const router = express.Router();

router.post('/reply', async (req: Request, res: Response) => {
	const { prompt, parentMessageId } = req.body;

	try {
		const data = await getChatCompletion(messages);
		res.json({type: "success", data });
	} catch(error:any) {
		console.error(error);
		res.json({type:"error", data: error.message });
	}
});


router.post('/chat', async (req: Request,res:Response) => {
	const { prompt } = req.body;
	console.log(prompt);

	res.setHeader("Content-Type", "text/html; charset=UTF-8");
	res.setHeader('Transfer-Encoding', "chunked");

	try {
		const streamResponse$ = await getStreamResponse(prompt);
		let data = "";
		streamResponse$.subscribe(
			partialResponse => {
                 // data += partialResponse;
                 // res.write(JSON.stringify({type: "success", data}));
				console.log(partialResponse);
				 res.write(partialResponse);
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