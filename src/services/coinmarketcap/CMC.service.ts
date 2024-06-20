import {CMCAxiosClient} from "../axios/CMCAxiosClient";
import {ICMCTrendingParams} from "../../types/CMC";

export class CMCService {
  client: CMCAxiosClient;
  constructor() {
    this.client = new CMCAxiosClient();
  }

  fetchCurrencies(params: Partial<ICMCTrendingParams>) {
    return this.client.get("/v1/cryptocurrency/trending/latest", params);
  }
}