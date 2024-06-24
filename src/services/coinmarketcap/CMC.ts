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
    const response = await cmcService.fetchCurrencyIDMap(req.query);
    res.json(response.data);
  } catch (error) {
    errorHandler(res, error);
  }
}


export async function CMCCurrencyTrendingLatestHandler(req: Request, res: Response) {
  try {
    const cmcService = new CMCService();
    const response = await cmcService.fetchCurrencyTrendingLatest(req.query);
    res.json(response.data);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function CMCCurrencyQuoteLatestHandler(req: Request, res: Response) {
  try {
    const cmcService = new CMCService();
    const response = await cmcService.fetchCurrencyQuoteLatest(req.query);
    res.json(response.data);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function CMCFiatHandler(req: Request, res: Response) {
  try {
    const cmcService = new CMCService();
    const response = await cmcService.fetchFiatMap(req.query);
    res.json(response.data);
  } catch (error) {
    errorHandler(res, error);
  }
}
