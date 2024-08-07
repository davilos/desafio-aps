import { makeUpdateClienteUseCase } from "@/use-cases/clientes/factories/make-update-cliente-use-case";
import { AlreadyExistsError } from "@/use-cases/errors/already-exists-error";
import { NotFoundError } from "@/use-cases/errors/not-found-error";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const updateParamsSchema = z.object({
      clienteId: z.coerce.number(),
    });

    const updateBodySchema = z.object({
      nome: z.string().max(100),
      nomeFantasia: z.string().max(100),
      email: z.string().email().max(100),
      telefone: z.string().max(15),
      CNPJ: z.string().max(14).min(14),
      CEP: z.string().max(10).min(8),
      logradouro: z.string().max(10),
      bairro: z.string().max(100),
      cidade: z.string().max(100),
      UF: z.string().max(2).min(2),
      complemento: z.string().max(100),
    });

    const { clienteId } = updateParamsSchema.parse(req.params);
    const data = updateBodySchema.parse(req.body);

    const useCase = makeUpdateClienteUseCase();

    const { cliente } = await useCase.execute({ clienteId, data });
    res.status(200).send(cliente);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({ error: err.message });
    }
    if (err instanceof AlreadyExistsError) {
      return res.status(403).send({ error: err.message });
    }
    next(err);
  }
}
