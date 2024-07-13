import { ClientesRepository } from "@/repositories/clientes-repository";
import { cliente } from "@prisma/client";
import { AlreadyExistsError } from "../errors/already-exists-error";

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
    const clienteAlreadyExists = await this.clientesRepository.findMany({
      email: data.email,
      telefone: data.telefone,
    });

    if (clienteAlreadyExists.length > 0)
      throw new AlreadyExistsError("cliente");

    const cliente = await this.clientesRepository.create(data);

    return { cliente };
  }
}
