import express, {Request, Response} from 'express';
import {getChatCompletion, getStreamResponse} from "../services/openAi.service";
import {saveChatMessage} from "../services/supabase.service";

const router = express.Router();

router.post('/reply', async (req: Request, res: Response) => {
	const { prompt, parentMessageId } = req.body;

	try {
    // save the prompt to supabase
    await saveChatMessage("user", prompt, parentMessageId);
    // get reply from openai api
		const reply = await getChatCompletion(prompt);
    // save the reply to supabase
    await saveChatMessage("assistant", reply, parentMessageId);

		res.json({type: "success", reply });
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