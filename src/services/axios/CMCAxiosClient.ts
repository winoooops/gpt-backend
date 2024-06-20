import {AxiosBaseClient} from "./AxiosBaseClient";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.COINMARKETCAP_API_KEY || !process.env.COINMARKETCAP_API_URL) {
  throw new Error("Missing CoinMarketCap API info.");
}


export class CMCAxiosClient extends AxiosBaseClient {
  url: string;
  constructor() {
    super(
      process.env.COINMARKETCAP_API_URL || "https://sandbox-api.coinmarketcap.com",
      {
      'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
    });
    this.url = process.env.COINMARKETCAP_API_URL || "";
  }

  sendGetRequest(url: string) {
    return this.client.get(url);
  }
}