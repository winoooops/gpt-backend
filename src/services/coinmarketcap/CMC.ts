import { Request, Response } from "express"
import {CMCService} from "./CMC.service";

export async function CMCCurrencyHandler(req: Request, res: Response) {
  try {
    const currencyService = new CMCService();
    const response = await currencyService.fetchCurrencies(req.params);
    // console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(404);
    res.end();
  }
}