import {
  Text,
  Box,
  SimpleGrid,
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataCep } from "../types/cep";
import { DataCnpj } from "../types/cnpj";
import { ClienteFormInput } from "./CreateCliente";
import { clienteShema } from "../types/cliente";
import { useEffect, useState } from "react";
import api from "../axios/config";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCliente() {
  const { clienteId } = useParams<{ clienteId: string }>();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
  } = useForm<ClienteFormInput>({
    mode: "onBlur",
    resolver: zodResolver(clienteShema),
  });

  const [nome, setNome] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [complemento, setComplemento] = useState("");

  const getCliente = async () => {
    try {
      const { data } = await api.get("/clientes");

      const clientes: ClienteFormInput[] = data.filter(
        (cliente: { id: number }) => cliente.id === Number(clienteId)
      );

      if (!clientes.length) navigate("/");

      setBairro(clientes[0].bairro);
      setCep(clientes[0].CEP);
      setCidade(clientes[0].cidade);
      setCnpj(clientes[0].CNPJ);
      setComplemento(clientes[0].complemento);
      setEmail(clientes[0].email);
      setLogradouro(clientes[0].logradouro);
      setNome(clientes[0].nome);
      setNomeFantasia(clientes[0].nomeFantasia);
      setTelefone(clientes[0].telefone);
      setUf(clientes[0].UF);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCliente();
  }, []);

  const handleCNPJ = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cnpjValue = e.target.value.replace(/\D/g, "");

    if (!cnpjValue) return;

    await fetch(`https://publica.cnpj.ws/cnpj/${cnpjValue}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data: DataCnpj) => {
        setValue("nome", data.razao_social ?? "");
        setNome(data.razao_social ?? "");

        setValue("email", data.estabelecimento.email ?? "");
        setEmail(data.estabelecimento.email ?? "");

        setValue("nomeFantasia", data.estabelecimento.nome_fantasia ?? "");
        setNomeFantasia(data.estabelecimento.nome_fantasia ?? "");

        setValue("telefone", data.estabelecimento.telefone1 ?? "");
        setTelefone(data.estabelecimento.telefone1 ?? "");

        setValue("CNPJ", cnpjValue);

        trigger("nome");
        trigger("email");
        trigger("nomeFantasia");
        trigger("telefone");
      });
  };

  const handleCEP = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value.replace(/\D/g, "");

    const url = `https://viacep.com.br/ws/${cepValue}/json`;

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data: DataCep) => {
        setValue("bairro", data.bairro ?? "");
        setBairro(data.bairro ?? "");

        setValue("CEP", data.cep ?? "");
        setCep(data.cep ?? "");

        setValue("logradouro", data.logradouro ?? "");
        setLogradouro(data.logradouro ?? "");

        setValue("UF", data.uf ?? "");
        setUf(data.uf ?? "");

        setValue("cidade", data.localidade ?? "");
        setCidade(data.localidade ?? "");

        trigger("bairro");
        trigger("CEP");
        trigger("logradouro");
        trigger("UF");
        trigger("cidade");
      });
  };

  async function onSubmit(event: React.FormEvent<HTMLDivElement>) {
    try {
      event.preventDefault();
      const response = await api.put(`/clientes/${clienteId}`, {
        nome,
        email,
        nomeFantasia,
        telefone,
        CNPJ: cnpj,
        CEP: cep,
        logradouro,
        bairro,
        cidade,
        UF: uf,
        complemento,
      });

      if (response.status === 200) {
        navigate("/clientes");
        alert("Cliente salvo com sucesso.");
      }
    } catch (error) {
      alert("Ocorreu um erro");
    }
  }

  return (
    <>
      <Box margin="4">
        <Text fontSize="xx-large" align={"center"}>
          Atualize o Cliente
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={3}
          alignItems={"center"}
          as={"form"}
          onSubmit={onSubmit}
        >
          <Center key="Nome" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.nome} isRequired>
              <FormLabel textAlign="center" color={"black"}>
                Nome
              </FormLabel>
              <Input
                placeholder="Nome"
                value={nome}
                {...register("nome")}
                onChange={(e) => setNome(e.target.value)}
              />
              <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="Email" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.email} isRequired>
              <FormLabel textAlign="center" color={"black"}>
                Email
              </FormLabel>
              <Input
                {...register("email")}
                placeholder="email@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="NomeFantasia" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.nomeFantasia}>
              <FormLabel textAlign="center" color={"black"}>
                Nome Fantasia
              </FormLabel>
              <Input
                placeholder="Nome Fantasia"
                {...register("nomeFantasia")}
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
              ></Input>
              <FormErrorMessage>
                {errors.nomeFantasia?.message}
              </FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="Telefone" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.telefone} isRequired>
              <FormLabel textAlign="center" color={"black"}>
                Telefone
              </FormLabel>
              <Input
                placeholder="(00) 0000-0000"
                {...register("telefone")}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              ></Input>
              <FormErrorMessage>{errors.telefone?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="CNPJ" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.CNPJ} isRequired>
              <FormLabel textAlign="center" color={"black"}>
                CNPJ
              </FormLabel>
              <Input
                placeholder="Apenas números"
                {...register("CNPJ")}
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                onBlur={handleCNPJ}
              ></Input>
              <FormErrorMessage>{errors.CNPJ?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="CEP" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.CEP} isRequired>
              <FormLabel textAlign="center" color={"black"}>
                CEP
              </FormLabel>
              <Input
                placeholder="Apenas números"
                {...register("CEP")}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={handleCEP}
              ></Input>
              <FormErrorMessage>{errors.CEP?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="Logradouro" mt="1rem">
            <FormControl
              width="full"
              isInvalid={!!errors.logradouro}
              isRequired
            >
              <FormLabel textAlign="center" color={"black"}>
                Logradouro
              </FormLabel>
              <Input
                placeholder="Logradouro"
                {...register("logradouro")}
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
              ></Input>
              <FormErrorMessage>{errors.logradouro?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="Bairro" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.bairro} isRequired>
              <FormLabel textAlign="center" color={"black"}>
                Bairro
              </FormLabel>
              <Input
                placeholder="Bairro"
                {...register("bairro")}
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              ></Input>
              <FormErrorMessage>{errors.bairro?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="Cidade" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.cidade} isRequired>
              <FormLabel textAlign="center" color={"black"}>
                Cidade
              </FormLabel>
              <Input
                placeholder="Cidade"
                {...register("cidade")}
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              ></Input>
              <FormErrorMessage>{errors.cidade?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="UF" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.UF} isRequired>
              <FormLabel textAlign="center" color={"black"}>
                UF
              </FormLabel>
              <Input
                placeholder="PE"
                {...register("UF")}
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              ></Input>
              <FormErrorMessage>{errors.UF?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center key="Complemento" mt="1rem">
            <FormControl width="full" isInvalid={!!errors.complemento}>
              <FormLabel textAlign="center" color={"black"}>
                Complemento
              </FormLabel>
              <Input
                placeholder="1° andar"
                {...register("complemento")}
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              ></Input>
              <FormErrorMessage>{errors.complemento?.message}</FormErrorMessage>
            </FormControl>
          </Center>
          <Center>
            <Button
              mt={"1rem"}
              fontSize={"medium"}
              type="submit"
              isLoading={isSubmitting}
            >
              Salvar
            </Button>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
}

export default UpdateCliente;
