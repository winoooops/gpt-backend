import { CryptoCurrencyApi } from "@/services/apollo/CryptoCurrency-api";

export interface DataSources {
  cryptoCurrencyAPI: CryptoCurrencyApi;
}

export interface ContextValue {
  dataSources: DataSources;
}

export interface CMCResponse {
  data: { [key: string]: any };
  status: {
    timestamp: string;
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
  };
}

export interface QueryResolver {
  latestQuote: (parent: never, args: { id: string }, context: ContextValue) => Promise<CMCResponse>;
}