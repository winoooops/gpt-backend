import OpenAI from "openai";
import dotenv from 'dotenv';
import {isNotEmptyString} from "../utils/utils";
import {Observable, from, concatMapTo, concatMap, of} from "rxjs";
import {Chat, ChatCompletionChunk} from "openai/resources";
import ChatCompletionMessageParam = Chat.ChatCompletionMessageParam;

dotenv.config();
const model = isNotEmptyString(process.env.OPENAI_API_MODEL) ? process.env.OPENAI_API_MODEL : 'gpt-3.5-turbo'

if (!isNotEmptyString(process.env.OPENAI_API_KEY)) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export async function getChatCompletion(messages: ChatCompletionMessageParam[]): Promise<string> {
    try {
        const completion = await openai.chat.completions.create(
        {
            messages,
            model: model as string,
        });

        const choice = completion.choices[0];
        if(choice?.message?.content) {
            return choice.message.content;
        } else {
            throw new Error('invalid response');
        }
    } catch(error: any) {
        throw { statusCode: error.status, message: error.message };
    }
}


export async function getStreamResponse(prompt: string): Promise<Observable<string>>{
    const stream = await openai.chat.completions.create(
        {
            messages: [
                {role: 'system', content: 'You are a helpful assistant'},
                {role: 'user', content: prompt}
            ],
            model: model as string,
            stream: true
        }
    );

    return new Observable(subscriber => {
        (async() => {
            try {
                for await(const chunk of stream) {
                    const choice = chunk.choices[0];
                    if(choice?.delta?.content) {
                        subscriber.next(choice.delta.content);
                    }
                }
            } catch (error) {
                subscriber.error(error);
            }

            subscriber.complete();
        })();
    });
}
