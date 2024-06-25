import {NextFunction, Request, Response} from "express"
import {CMCService} from "../../services/coinmarketcap/CMC.service";
import {CMCError} from "../../utils/CMCError";
import {CMCCurrencyQuoteRequiredParams} from "../../types/CMC";


export async function CMCCurrencyIDMapHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const cmcService = new CMCService();
    const response = await cmcService.fetchCurrencyIDMap(req.query);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
}


export async function CMCCurrencyTrendingLatestHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const cmcService = new CMCService();
    const response = await cmcService.fetchCurrencyTrendingLatest(req.query);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
}

export async function CMCCurrencyQuoteLatestHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const cmcService = new CMCService();
    const { id, slug, symbol } = req.query;
    if(!id && !slug && !symbol) {
      return next(new CMCError(400, "missing required params"));
    }
    const response = await cmcService.fetchCurrencyQuoteLatest(req.query as CMCCurrencyQuoteRequiredParams);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
}

export async function CMCFiatHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const cmcService = new CMCService();
    const response = await cmcService.fetchFiatMap(req.query);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
}
