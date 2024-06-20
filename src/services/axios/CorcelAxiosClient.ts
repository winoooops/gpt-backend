import dotenv from "dotenv";
import {ICorcelBody} from "../../types/corcel";
import {AxiosInstance} from "axios";
import {AxiosClientFactory} from "./AxiosBaseClient";
dotenv.config();

if(!process.env.CORCEL_API_KEY) {
  throw new Error('Missing CORCEL_API_KEY environment variable')
}

/*
* when the client is created, automatically inject apiKey
 */
export class CorcelAxiosClient {
  client: AxiosInstance;
  constructor(apiKey:string) {
    this.client = AxiosClientFactory.createClient(
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