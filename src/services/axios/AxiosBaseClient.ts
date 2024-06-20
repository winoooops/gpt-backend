import axios, {AxiosInstance} from "axios";

export class AxiosBaseClient {
  client: AxiosInstance;
  constructor(baseUrl:string, headers: {}) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers
    })
  }
}