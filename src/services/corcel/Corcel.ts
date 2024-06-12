import { Request, Response } from "express";
import { CorcelTextService } from "./CorcelText.service";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.CORCEL_API_TEXT_ROUTE) {
  throw new Error("can't find environmental variable: CORCEL_API_TEXT_ROUTE");
}

const textURL = process.env.CORCEL_API_TEXT_ROUTE.toString();

export async function corcelTextHandler(req: Request, res: Response) {
  const { prompt, parentMessageId } = req.body;
  console.log(prompt, parentMessageId);
  try {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

    // get reply from corcel api
    const corcelTextService = new CorcelTextService(textURL);
    const response = await corcelTextService.getChatResponse({ role: 'user', content: prompt });

    // instead of using response.pipe(res), using the following iterative
    // Assuming response is a Node.js stream
    response.on("data", (chunk) => {
      const payloads = chunk.toString().split("\n\n");

      for(const payload of payloads) {
        if(payload.includes("[DONE]")) {
          res.end();
          return;
        }

        if(payload.startsWith("data:")) {
          console.log(payload);
          try {
            const data = JSON.parse(payload.replace("data: ", ""));
            const content = data.choices[0]?.delta?.content;
            console.log(content);
            if(content) {
              res.write(content);
            }
          } catch(error) {
            console.error(`Error with JSON.parse and ${payload}.\n${error}`);
          }
        }
      }
    })
  } catch (error: any) {
    // If headers are already sent, you cannot set new headers or send a new response
    if (!res.headersSent) {
      res.status(500).send("Internal Server Error");
    } else {
      // If headers are sent, just log the error and ensure the stream is closed
      console.error('Error after response has started:', error);
      res.end();
    }
  }
}