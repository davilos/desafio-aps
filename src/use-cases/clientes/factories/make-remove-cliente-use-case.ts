import { PrismaClientesRepository } from "@/repositories/prisma/prisma-clientes-repository";
import { RemoveClienteUseCase } from "../remove-cliente";

export function makeRemoveClienteUseCase() {
  const repository = new PrismaClientesRepository();
  const useCase = new RemoveClienteUseCase(repository);

  return useCase;
}
