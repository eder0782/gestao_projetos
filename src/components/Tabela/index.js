import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
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

function Tabela() {
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
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
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
                      //leftIcon={}
                    >
                      <FiTrash2 />
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>30.48</Td>
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
                      //leftIcon={}
                    >
                      <FiTrash2 />
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>0.91444</Td>
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
                      //leftIcon={}
                    >
                      <FiTrash2 />
                    </Button>
                  </HStack>
                </Td>
              </Tr>
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
