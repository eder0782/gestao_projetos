import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Text,
  TableCaption,
  TableContainer,
  Container,
  Box,
  Center,
  HStack,
  Button,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

function Tabela(props) {
  // function handleLinhaTabela(obj) {
  //   return <div key={obj.key}>{obj.data}</div>;
  //   // console.log(obj);
  // }

  return (
    <Center>
      <Box marginTop="10" width="90%">
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Fornecedor</Th>
                <Th>Descrição</Th>
                <Th isNumeric>Valor</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.dados.length > 0 ? (
                props.dados.map((item) => {
                  return (
                    <Tr>
                      <Td>{item.data}</Td>
                      <Td>{item.fornecedor}</Td>
                      <Td>{item.descric}</Td>
                      <Td isNumeric>{item.valor}</Td>
                      <Td>
                        <HStack>
                          <Button
                            colorScheme="teal"
                            // leftIcon={}
                          >
                            <FiEdit />
                          </Button>
                          <Button
                            colorScheme="red"
                            // onClick={props.delete(item.key)}
                            //leftIcon={}
                          >
                            <FiTrash2 />
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>Menor</Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Center>
  );
}

export default Tabela;
