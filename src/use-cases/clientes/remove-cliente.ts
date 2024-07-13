import { ClientesRepository } from "@/repositories/clientes-repository";
import { cliente } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";

interface RemoveClienteUseCaseRequest {
  clienteId: number;
}

export class RemoveClienteUseCase {
  constructor(private clientesRepository: ClientesRepository) {}

  async execute({ clienteId }: RemoveClienteUseCaseRequest): Promise<void> {
    const cliente = await this.clientesRepository.delete(clienteId);

    if (!cliente) throw new NotFoundError("cliente");
  }
}
