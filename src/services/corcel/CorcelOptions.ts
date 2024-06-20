import {ICorcelBody, ICorcelOptions} from "../../types/corcel";

export class CorcelOptions implements ICorcelOptions {
  method: string;
  headers: {
    accept: string;
    "Content-Type": string;
    Authorization: string;
  };
  body: string;

  constructor(method: string, key: string, contentType: string, body: ICorcelBody, isStream = false) {
    this.method = method;
    this.headers = {
      accept: contentType,
      "Content-Type": isStream? "text/event-stream" : contentType,
      Authorization: key,
    };
    this.body = JSON.stringify(body);
  }
}