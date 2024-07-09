import { PrismaClientesRepository } from "@/repositories/prisma/prisma-clientes-repository";
import { GetClienteUseCase } from "../get-cliente";

export function makeGetClienteUseCase() {
  const repository = new PrismaClientesRepository();
  const useCase = new GetClienteUseCase(repository);

  return useCase;
}
