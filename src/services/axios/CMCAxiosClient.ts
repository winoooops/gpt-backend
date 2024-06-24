import dotenv from "dotenv";
import {AxiosInstance} from "axios";
import {AxiosClientFactory} from "./AxiosBaseClient";
import {CMCResponse} from "../../types/CMC";

dotenv.config();

if(!process.env.COINMARKETCAP_API_KEY || !process.env.COINMARKETCAP_API_URL) {
  throw new Error("Missing CoinMarketCap API info.");
}


export class CMCAxiosClient  {
  url: string;
  client: AxiosInstance;
  constructor() {
    this.client = AxiosClientFactory.createClient(
      process.env.COINMARKETCAP_API_URL || "https://sandbox-api.coinmarketcap.com",
      {
      'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
    });
    this.url = process.env.COINMARKETCAP_API_URL || "";
  }

  get<T>(url: string, params: T): Promise<CMCResponse> {
    return this.client.get(url, {
      params
    });
  }
}