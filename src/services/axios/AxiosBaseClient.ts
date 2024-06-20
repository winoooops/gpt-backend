import axios from "axios";

export class AxiosClientFactory {
  static createClient(baseURL: string, headers: {}) {
    return axios.create({
      baseURL,
      headers
    })
  }
}