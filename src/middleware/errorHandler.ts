import {NextFunction, Request, Response} from "express"
import {CMCError} from "../utils/CMCError";
import {AxiosError} from "axios";

export function errorHandlerMiddleware(error: unknown, req: Request, res: Response, next: NextFunction) {
  // if the header is already sent, pass to the next error handler
  if(res.headersSent) return next(error);

  if(error instanceof CMCError) {
    const cmcError = error as CMCError;
    res.status(cmcError.status.error_code).json({...cmcError.status});
  }
  else if (error instanceof AxiosError) {
    const axiosError = error as AxiosError;
    if(axiosError.response) {
      res.status(axiosError.response.status).json(axiosError.response.data);
    } else {
      res.status(500).json({
        error_code: 500,
        error_message: axiosError.message || "Internal Server Error"
      });
    }
  }
  else {
    const knownError = error as Error;
    res.status(500).json({
      error_code: 500,
      error_message: knownError.message || "internal error"
    })
  }
}