import { ClientesRepository } from "@/repositories/clientes-repository";
import { cliente } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";

interface UpdateClienteUseCaseRequest {
  clienteId: number;
  data: {
    nome: string;
    nomeFantasia: string;
    email: string;
    telefone: string;
    CNPJ: string;
    CEP: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    UF: string;
    complemento: string;
  };
}

interface UpdateClienteUseCaseResponse {
  cliente: cliente;
}

export class UpdateClienteUseCase {
  constructor(private clientesRepository: ClientesRepository) {}

  async execute({
    clienteId,
    data,
  }: UpdateClienteUseCaseRequest): Promise<UpdateClienteUseCaseResponse> {
    const cliente = await this.clientesRepository.update(clienteId, data);

    if (!cliente) throw new NotFoundError("cliente");

    return { cliente };
  }
}
