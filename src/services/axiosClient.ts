import axios, {AxiosInstance} from "axios";
import dotenv from "dotenv";
import {ICorcelBody} from "./corcel/corcel.type";
dotenv.config();

if(!process.env.CORCEL_API_KEY) {
  throw new Error('Missing CORCEL_API_KEY environment variable')
}

/*
* when the client is created, automatically inject apiKey
 */
export class AxiosClient {
  client: AxiosInstance;
  constructor(apiKey:string) {
    this.client = axios.create({
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: apiKey,
      }
    });
  }

  post(url: string, body: ICorcelBody, config = {}) {
    return this.client.post(url, body, config);
  }
}