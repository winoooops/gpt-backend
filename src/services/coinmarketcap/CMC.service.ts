import {CMCAxiosClient} from "../axios/CMCAxiosClient";
import {
  CMCFiatParams,
  CMCResponse,
  CMCCurrencyTrendingParams,
  CMCCurrencyIDMapParams,
  CMCCurrencyQuoteLatestParams
} from "../../types/CMC";

export class CMCService {
  client: CMCAxiosClient;
  constructor() {
    this.client = new CMCAxiosClient();
  }

  /*
   * return currencyMap info
   * see more at https://coinmarketcap.com/api/documentation/v0/#operation/getV1CryptocurrencyMap
   */
  fetchCurrencyIDMap(params: Partial<CMCCurrencyIDMapParams>):Promise<CMCResponse> {
    return this.client.get("/v1/cryptocurrency/map", params);
  }

  fetchCurrencyQuoteLatest(params: Partial<CMCCurrencyQuoteLatestParams>): Promise<CMCResponse> {
    return this.client.get("/v2/cryptocurrency/quotes/latest", {
      ...params,
      aux: params.aux?.join(",")
    });
  }

  fetchFiatMap(params: Partial<CMCFiatParams>):Promise<CMCResponse> {
    return this.client.get("/v1/fiat/map", params);
  }

  fetchCurrencyTrendingLatest(params: Partial<CMCCurrencyTrendingParams>): Promise<CMCResponse> {
    return this.client.get("/v1/cryptocurrency/trending/latest", params);
  }
}