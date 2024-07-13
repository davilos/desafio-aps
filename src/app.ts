import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./http/middlewares/error-handler";
import cors from "cors";
import { create } from "./http/controllers/clientes/create";
import { fetch } from "./http/controllers/clientes/fetch";
import { remove } from "./http/controllers/clientes/remove";
import { update } from "./http/controllers/clientes/update";

export const app = express();

app.use(cors());

app.post("/clientes", (req: Request, res: Response, next: NextFunction) =>
  create(req, res, next)
);
app.get("/clientes", (req: Request, res: Response, next: NextFunction) =>
  fetch(req, res, next)
);

app.delete(
  "/clientes/:clienteId",
  (req: Request, res: Response, next: NextFunction) => remove(req, res, next)
);
app.put(
  "/clientes/:clienteId",
  (req: Request, res: Response, next: NextFunction) => update(req, res, next)
);

app.use(errorHandler);
