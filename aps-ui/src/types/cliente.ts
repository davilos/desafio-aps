import { z } from "zod";

export const clienteShema = z.object({
  nome: z.string().max(100).min(1),
  nomeFantasia: z.string().max(100),
  email: z.string().email().max(100).min(1),
  telefone: z.string().max(15).min(1),
  cnpj: z.string().max(14).min(14),
  cep: z.string().max(10).min(8),
  logradouro: z.string().max(10).min(1),
  bairro: z.string().max(100).min(1),
  cidade: z.string().max(100).min(1),
  uf: z.string().max(2).min(2),
  complemento: z.string().max(100),
});
