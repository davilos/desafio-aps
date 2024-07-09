import express, { Express, Request, Response } from "express";
import { errorHandler } from "./http/middlewares/error-handler";

export const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express");
});

app.use(errorHandler);
