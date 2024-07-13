import { makeRemoveClienteUseCase } from "@/use-cases/clientes/factories/make-remove-cliente-use-case";
import { NotFoundError } from "@/use-cases/errors/not-found-error";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const removeParamsSchema = z.object({
      clienteId: z.coerce.number(),
    });

    const { clienteId } = removeParamsSchema.parse(req.params);

    const useCase = makeRemoveClienteUseCase();

    await useCase.execute({ clienteId });
    res.status(200).send();
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({ error: err.message });
    }
    next(err);
  }
}
