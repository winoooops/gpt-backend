import OpenAI from "openai";
import dotenv from 'dotenv';
import {isNotEmptyString} from "../utils/utils";

dotenv.config();
const model = isNotEmptyString(process.env.OPENAI_API_MODEL) ? process.env.OPENAI_API_MODEL : 'gpt-3.5-turbo'

if(!isNotEmptyString(process.env.OPENAI_API_KEY)) {
	throw new Error('Missing OPENAI_API_KEY environment variable')
}

// const openaiOptions: ChatGPTAPIOptions = {
// 	apiKey: process.env.OPENAI_API_KEY as string,
// 	completionParams: {
// 		model:aiModel,
// 	},
// 	debug: process.env.OPENAI_API_DEBUG_ENABLED? true : false,
// }
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY as string,
});


export async function getResponse(prompt: string): Promise<string> {
	const completion = await openai.chat.completions.create({
		messages: [
			{role: 'system', content: 'You are a helpful assistant'},
			{role: 'user', content: prompt}
		],
		model: model as string,
	});

	return completion.choices[0].message.content!;
}