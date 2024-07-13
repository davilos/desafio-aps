import express, { Request, Response } from "express";
import { errorHandler } from "./http/middlewares/error-handler";
import cors from "cors";
import { create } from "./http/controllers/clientes/create";
import { fetch } from "./http/controllers/clientes/fetch";
import { remove } from "./http/controllers/clientes/remove";
import { update } from "./http/controllers/clientes/update";

export const app = express();

app.use(cors());

app.post("/clientes", (req: Request, res: Response) => create(req, res));
app.get("/clientes", (req: Request, res: Response) => fetch(req, res));

app.delete("/clientes/:clienteId", (req: Request, res: Response) =>
  remove(req, res)
);
app.put("/clientes/:clienteId", (req: Request, res: Response) =>
  update(req, res)
);

app.use(errorHandler);
