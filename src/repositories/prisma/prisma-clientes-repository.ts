import { Prisma, cliente } from "@prisma/client";
import { ClientesRepository } from "../clientes-repository";
import { prisma } from "@/lib/prisma";

export class PrismaClientesRepository implements ClientesRepository {
  async create(data: Prisma.clienteUncheckedCreateInput): Promise<cliente> {
    const cliente = await prisma.cliente.create({
      data: {
        ...data,
      },
    });

    return cliente;
  }
  async delete(clienteId: number): Promise<cliente | null> {
    const cliente = await prisma.cliente.delete({
      where: {
        id: clienteId,
      },
    });

    return cliente;
  }
  async findUnique(clienteId: number): Promise<cliente | null> {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: clienteId,
      },
    });

    return cliente;
  }
  async findMany(
    data?: Prisma.clienteUncheckedUpdateInput
  ): Promise<cliente[]> {
    const clientes = await prisma.cliente.findMany({
      where: {
        email: data?.email ? data.email.toString() : undefined,
        telefone: data?.telefone ? data.telefone.toString() : undefined,
      },
    });

    return clientes;
  }
  async update(
    clienteId: number,
    data: Prisma.clienteUncheckedUpdateInput
  ): Promise<cliente | null> {
    const cliente = await prisma.cliente.update({
      where: {
        id: clienteId,
      },
      data: {
        ...data,
      },
    });

    return cliente;
  }
}
