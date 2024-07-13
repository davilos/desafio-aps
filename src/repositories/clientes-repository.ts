import { cliente, Prisma } from "@prisma/client";

export interface ClientesRepository {
  create(data: Prisma.clienteUncheckedCreateInput): Promise<cliente>;
  findMany(): Promise<cliente[]>;
  update(
    clienteId: number,
    data: Prisma.clienteUncheckedUpdateInput
  ): Promise<cliente | null>;
  delete(clienteId: number): Promise<cliente | null>;
}
