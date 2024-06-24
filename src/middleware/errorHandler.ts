import {NextFunction, Request, Response} from "express"
import {CMCError} from "../utils/CMCError";
import {CMCErrorResponse} from "../types/CMC";

export function errorHandlerMiddleware(error: unknown, req: Request, res: Response, next: NextFunction) {
  // if the header is already sent, pass to the next error handler
  if(res.headersSent) return next(error);

  if(error instanceof CMCError) {
    const cmcError = error as CMCErrorResponse;
    res.status(cmcError.status.error_code).json({...cmcError.status});
  } else {
    const knownError = error as Error;
    res.status(500).json({
      error_code: 500,
      error_message: knownError.message || "internal error"
    })
  }
}