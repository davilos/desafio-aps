import { PrismaClientesRepository } from "@/repositories/prisma/prisma-clientes-repository";
import { FetchClienteUseCase } from "../fetch-cliente";

export function makeFetchClienteUseCase() {
  const repository = new PrismaClientesRepository();
  const useCase = new FetchClienteUseCase(repository);

  return useCase;
}
