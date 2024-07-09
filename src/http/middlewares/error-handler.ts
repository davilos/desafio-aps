import { Request, Response } from "express";
import { env } from "@/env";
import { ZodError } from "zod";

export async function errorHandler(
  error: unknown,
  _: Request,
  reply: Response
) {
  if (env.NODE_ENV !== "production") {
    console.log(error);
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  return reply.status(500).send({ message: "Internal server error" });
}
