import dotenv from "dotenv";
import {ICorcelBody} from "../../types/corcel";
import {AxiosBaseClient} from "./AxiosBaseClient";
dotenv.config();

if(!process.env.CORCEL_API_KEY) {
  throw new Error('Missing CORCEL_API_KEY environment variable')
}

/*
* when the client is created, automatically inject apiKey
 */
export class CorcelAxiosClient extends AxiosBaseClient{
  constructor(apiKey:string) {
    super(
      process.env.CORCEL_API_URL || "",
      {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: apiKey,
    });
  }

  post(url: string, body: ICorcelBody, config = {}) {
    return this.client.post(url, body, config);
  }
}