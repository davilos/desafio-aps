import { ClientesRepository } from "@/repositories/clientes-repository";
import { cliente } from "@prisma/client";

interface CreateClienteUseCaseRequest {
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
}

interface CreateClienteUseCaseResponse {
  cliente: cliente;
}

export class CreateClienteUseCase {
  constructor(private clientesRepository: ClientesRepository) {}

  async execute(
    data: CreateClienteUseCaseRequest
  ): Promise<CreateClienteUseCaseResponse> {
    const cliente = await this.clientesRepository.create(data);

    return { cliente };
  }
}
