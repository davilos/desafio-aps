import { PrismaClientesRepository } from "@/repositories/prisma/prisma-clientes-repository";
import { CreateClienteUseCase } from "../create-cliente";

export function makeCreateClienteUseCase() {
  const repository = new PrismaClientesRepository();
  const useCase = new CreateClienteUseCase(repository);

  return useCase;
}
