import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorId = uuidv4();
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[${errorId}] Error:`, {
    status,
    message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(status).json({
    error: message,
    errorId,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    error: `Route not found: ${req.method} ${req.path}`,
  });
};
