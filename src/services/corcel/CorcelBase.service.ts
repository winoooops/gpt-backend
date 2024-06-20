import dotenv from "dotenv";
import {isNotEmptyString} from "../../utils/utils";
import {ICorcelBody} from "../../types/corcel";
import {CorcelOptions} from "./CorcelOptions";
import axios from "axios";
import {CorcelAxiosClient} from "../axios/CorcelAxiosClient";
import {Readable} from "stream";

dotenv.config();

if(!isNotEmptyString(process.env.CORCEL_API_URL)) {
  throw new Error('Missing CORCEL_API_URL environment variable');
}
const corcelApiUrl = process.env.CORCEL_API_URL as string;

if(!isNotEmptyString(process.env.CORCEL_API_KEY)) {
  throw new Error('Missing CORCEL_API_KEY environment variable');
}
const corcelApiKey = process.env.CORCEL_API_KEY as string;

export class CorcelBaseService {
  readonly corcelApiUrl: string;
  private readonly corcelApiKey: string;


  constructor(endpoint: string) {
    this.corcelApiUrl = endpoint;
    this.corcelApiKey = corcelApiKey;
  }

  async sendRequest(body: ICorcelBody): Promise<Response> {
    const options = new CorcelOptions('POST', this.corcelApiKey, 'application/json', body);
    return fetch(this.corcelApiUrl, options);
  }

  async sendStreamRequest(body: ICorcelBody): Promise<Readable> {
    try {
      const req = new CorcelAxiosClient(this.corcelApiKey);
      const response = await req.post(this.corcelApiUrl, body, {
        responseType: "stream"
      });

      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
}