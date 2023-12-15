import express, {Request, Response} from 'express';
import {getResponse, getStreamResponse} from "../services/openAiService";

const router = express.Router();

router.post('/reply', async (req: Request, res: Response) => {
	const { messages, prompt } = req.body;
	console.log(messages);
	console.log("prompt is now" + prompt)

	try {
		const data = await getResponse(messages, prompt);
		res.json({type: "success", data, prompt});
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
