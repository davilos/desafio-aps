import { PrismaClientesRepository } from "@/repositories/prisma/prisma-clientes-repository";
import { UpdateClienteUseCase } from "../update-cliente";

export function makeUpdateClienteUseCase() {
  const repository = new PrismaClientesRepository();
  const useCase = new UpdateClienteUseCase(repository);

  return useCase;
}
