import { ClientesRepository } from "@/repositories/clientes-repository";
import { cliente } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";

interface GetClienteUseCaseRequest {
  clienteId: number;
}

interface GetClienteUseCaseResponse {
  cliente: cliente;
}

export class GetClienteUseCase {
  constructor(private clientesRepository: ClientesRepository) {}

  async execute({
    clienteId,
  }: GetClienteUseCaseRequest): Promise<GetClienteUseCaseResponse> {
    const cliente = await this.clientesRepository.findUnique(clienteId);

    if (!cliente) throw new NotFoundError("cliente");

    return { cliente };
  }
}
