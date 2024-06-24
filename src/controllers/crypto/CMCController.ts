import {NextFunction, Request, Response} from "express"
import {CMCService} from "../../services/coinmarketcap/CMC.service";


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
    const response = await cmcService.fetchCurrencyQuoteLatest(req.query);
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
