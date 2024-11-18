import {RESTDataSource} from "@apollo/datasource-rest";
import * as process from "process";

export class CryptoCurrencyApi extends RESTDataSource {
  override baseURL = process.env.COINMARKETCAP_API_URL;

  async getLatestQuote({ id = '1'}) {
    return this.get("v1/cryptocurrency/quotes/latest", {
      params: {
        id
      }
    });
  }
}