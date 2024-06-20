import {CorcelBaseService} from "./CorcelBase.service";
import {ICorcelBody, ICorcelMessage, ICorcelResponse} from "../../types/corcel";
import {Readable} from "stream";

export class CorcelTextService extends CorcelBaseService {
  constructor(url: string) {
    super(url);
  }

  // TODO: refactor this so a config can change settings like temperature, max_token etc
  async getChatResponse(message: ICorcelMessage): Promise<Readable> {
    const body: ICorcelBody = {
      model: "cortext-ultra",
      stream: true,
      top_p: 1,
      temperature: 0.0001,
      max_tokens: 4096,
      messages: [message]
    };

    return await this.sendStreamRequest(body);
  }
}