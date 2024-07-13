import { ClientesRepository } from "@/repositories/clientes-repository";
import { cliente } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";
import { AlreadyExistsError } from "../errors/already-exists-error";

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
    const clienteAlreadyExists = await this.clientesRepository.findMany({
      email: data.email,
      telefone: data.telefone,
    });

    if (clienteAlreadyExists.length > 0)
      throw new AlreadyExistsError("cliente");

    const cliente = await this.clientesRepository.update(clienteId, data);

    if (!cliente) throw new NotFoundError("cliente");

    return { cliente };
  }
}
