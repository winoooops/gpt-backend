import express, {Request, Response} from 'express';
import {getChatCompletion, getStreamResponse} from "../services/openai/openAi.service";
// import {getChatMessageFromId, saveChatMessage} from "../services/supabase/supabase.service";
import {SupabaseMessage} from "../types/supabase";
import {corcelTextHandler} from "../services/corcel/Corcel";

const router = express.Router();

router.post('/reply', corcelTextHandler);

router.post('/chat', async (req: Request,res:Response) => {
	const { prompt } = req.body;

	res.setHeader("Content-Type", "text/html; charset=UTF-8");
	res.setHeader('Transfer-Encoding', "chunked");

	try {
		const streamResponse$ = await getStreamResponse(prompt);
		streamResponse$.subscribe(
			partialResponse => {
                 // data += partialResponse;
                 // res.write(JSON.stringify({type: "success", data}));
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
		res.json(error);
	}
})

export default router;