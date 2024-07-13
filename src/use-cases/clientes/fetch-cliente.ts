import { ClientesRepository } from "@/repositories/clientes-repository";
import { cliente } from "@prisma/client";

interface FetchClienteUseCaseResponse {
  clientes: cliente[];
}

export class FetchClienteUseCase {
  constructor(private clientesRepository: ClientesRepository) {}

  async execute(): Promise<FetchClienteUseCaseResponse> {
    const clientes = await this.clientesRepository.findMany();

    return { clientes };
  }
}
