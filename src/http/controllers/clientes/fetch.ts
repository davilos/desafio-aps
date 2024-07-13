import { makeFetchClienteUseCase } from "@/use-cases/clientes/factories/make-fetch-cliente-use-case";
import { Request, Response } from "express";

export async function fetch(req: Request, res: Response) {
  try {
    const useCase = makeFetchClienteUseCase();

    const { clientes } = await useCase.execute();
    res.status(200).send(clientes);
  } catch (err) {
    throw err;
  }
}
