import { NextFunction, Request, Response } from "express";
import { env } from "@/env";
import { ZodError } from "zod";

export async function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (env.NODE_ENV !== "production") {
    console.log(error);
  }

  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  return res.status(500).send({ message: "Internal server error" });
}
