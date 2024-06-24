import {CMCErrorResponse} from "../types/CMC";

export class CMCError implements CMCErrorResponse {
  status: {
    error_code: number;
    error_message: string;
  }
  constructor(code: number, msg: string) {
    this.status = {
      error_code: code,
      error_message: msg
    }
  }
}