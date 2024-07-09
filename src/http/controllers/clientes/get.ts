import { makeGetClienteUseCase } from "@/use-cases/clientes/factories/make-get-cliente-use-case";
import { NotFoundError } from "@/use-cases/errors/not-found-error";
import { Request, Response } from "express";
import { z } from "zod";

export async function get(req: Request, res: Response) {
  const getParamsSchema = z.object({
    clienteId: z.coerce.number(),
  });

  const { clienteId } = getParamsSchema.parse(req.params);

  try {
    const useCase = makeGetClienteUseCase();

    const cliente = await useCase.execute({ clienteId });
    res.status(200).send(cliente);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({ error: err.message });
    }
    throw err;
  }
}
