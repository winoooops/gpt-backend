import {CMCAxiosClient} from "../axios/CMCAxiosClient";

export class CMCService {
  client: CMCAxiosClient;
  constructor() {
    this.client = new CMCAxiosClient();
  }

  fetchCurrencies() {
    return this.client.sendGetRequest("/v1/cryptocurrency/listings/latest?start=1&limit=100&sort=market_cap&cryptocurrency_type=all&tag=all");
  }
}