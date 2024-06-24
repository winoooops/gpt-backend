import { Request, Response } from "express"
import {CMCService} from "./CMC.service";
import {CMCErrorResponse} from "../../types/CMC";
import {CMCError} from "../../utils/CMCError";
import {FineTuningJob} from "openai/resources/fine-tuning";
import Error = FineTuningJob.Error;

function errorHandler(res: Response, error: unknown) {
  if(error instanceof CMCError) {
    const cmcError = error as CMCErrorResponse;
    res.status(cmcError.status.error_code).json({...cmcError.status})
  } else {
    const knownError = error as Error;
    res.status(500).json({
      error_code: 500 ,
      error_message: knownError.message || "internal error"
    })
  }
}

export async function CMCCurrencyIDMapHandler(req: Request, res: Response) {
  try {
    const cmcService = new CMCService();
    const response = await cmcService.fetchCurrencyIDMap(req.params);
    console.log(response);
    res.json(response.data);
  } catch (error) {
    errorHandler(res, error);
  }
}


export async function CMCCurrencyTrendingLatestHandler(req: Request, res: Response) {
  try {
    const cmcService = new CMCService();
    const response = await cmcService.fetchCurrencyIDMap(req.params);
    console.log(response);
    res.json(response.data);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function CMCFiatHandler(req: Request, res: Response) {
  try {
    const cmcService = new CMCService();
    const response = await cmcService.fetchFiatMap(req.params);
    console.log(response);
    res.json(response.data);
  } catch (error) {
    errorHandler(res, error);
  }
}