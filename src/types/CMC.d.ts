export interface CMCResponse {
  data: {[key:string]: any},
  status: {
    timestamp: string,
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
  }
}

export interface CMCErrorResponse {
  status: {
    error_code: number;
    error_message: string;
  }
}


export interface CMCCurrencyIDMapParams {
  listing_status: "active" | "inactive";
  start: number;
  limit: number;
  sort: "id" | "cmc_rank";
  symbol: string;
  aux: string;
}

interface CMCCurrencyQuoteLatestParams {
  convert: string;
  convert_id: string;
  aux: QuoteAuxItem[];
  skip_invalid: boolean;
}

type QuoteAuxItem = ("first_historical_data" | "last_historical_data" | "is_active" | "status");

type CMCCurrencyQuoteRequiredParams =
  { id: number }
  | { slug: string }
  | { symbol: string }
  | { id: number; slug: string }
  | { id: number; symbol: string }
  | { slug: string; symbol: string }
  | { id: number; slug: string; symbol: string };

export type CMCCurrentQuoteLatestParamsRequired = Partial<CMCCurrencyQuoteLatestParams> & CMCCurrencyQuoteRequiredParams;



export interface CMCCurrencyTrendingParams {
  start: number;
  limit: number;
  time_period: "24h" | "30d" | "7d";
  convert: string;
  convert_id: number;
}

export interface CMCFiatParams {
  start: number;
  limit: number;
  sort: "id" | "name";
  include_metals: boolean;
}

