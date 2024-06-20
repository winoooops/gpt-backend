type ICorcelModels = "cortext-ultra";

export interface ICorcelBody {
  model: string;
  stream: boolean;
  top_p: number;
  temperature: number;
  max_tokens: number;
  messages?: ICorcelMessage[];
}

export interface ICorcelOptions {
  method: string;
  headers: {
    accept: string;
    "Content-Type": string;
    Authorization: string;
  };
  body: string;
}

export interface ICorcelMessage {
  role: string; // TODO: should identify the role type
  content: string;
}

export interface ICorcelResponse {
  choices: {
    delta: {
      content: string;
    },
    finish_reason: string;
  }[];
}