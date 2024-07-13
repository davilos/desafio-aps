import {
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ClienteFormInput } from "./CreateCliente";
import { useNavigate } from "react-router-dom";
import api from "../axios/config";

function ListClientes() {
  const [clientes, setClientes] = useState<ClienteFormInput[]>([]);

  const navigate = useNavigate();

  const getClientes = async () => {
    try {
      const response = await api.get("/clientes");

      setClientes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const handleDeleteCliente = async (_id: string) => {
    try {
      await api.delete(`/clientes/${_id}`);
      getClientes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowUpdateClienteForm = (cliente: ClienteFormInput) => {
    navigate(`/clientes/${cliente.id}`);
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Clientes</TableCaption>
          <Thead bgColor={"gray.100"}>
            <Tr>
              <Th>Nome</Th>
              <Th>Nome Fantasia</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>CEP</Th>
              <Th>CNPJ</Th>
              <Th>Logradouro</Th>
              <Th>Cidade</Th>
              <Th>Bairro</Th>
              <Th>Complemento</Th>
              <Th>UF</Th>
              <Th>Ação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientes.map((cliente: ClienteFormInput) => {
              return (
                <Tr key={cliente.email}>
                  <Td>{cliente.nome}</Td>
                  <Td>{cliente.nomeFantasia}</Td>
                  <Td>{cliente.email}</Td>
                  <Td>{cliente.telefone}</Td>
                  <Td>{cliente.CEP}</Td>
                  <Td>{cliente.CNPJ}</Td>
                  <Td>{cliente.logradouro}</Td>
                  <Td>{cliente.cidade}</Td>
                  <Td>{cliente.bairro}</Td>
                  <Td>{cliente.complemento}</Td>
                  <Td>{cliente.UF}</Td>
                  <Td>
                    <Flex>
                      <Button
                        size={"sm"}
                        fontSize={"smaller"}
                        colorScheme={"yellow"}
                        mr={"2"}
                        onClick={() => handleShowUpdateClienteForm(cliente)}
                      >
                        Editar
                      </Button>
                      <Button
                        size={"sm"}
                        fontSize={"smaller"}
                        colorScheme={"red"}
                        onClick={() => handleDeleteCliente(cliente.id)}
                      >
                        Remover
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListClientes;
