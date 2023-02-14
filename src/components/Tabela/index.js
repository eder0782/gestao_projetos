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
  Box,
  Center,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState, useRef } from "react";

function Tabela(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [idDelete, setIdDelete] = useState(null);
  const initialRef = useRef(null);

  const deletar = () => {
    props.delete(idDelete);
    onClose();
  };

  return (
    <Center>
      <Modal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Exclusão!!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>
              Após a exclusão o lançamento não poderá mais ser restaurado.
              Deseja realmente Exluir??
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={deletar} colorScheme="teal" mr={3}>
              SIM
            </Button>
            <Button ref={initialRef} onClick={onClose} colorScheme="red">
              NÃO
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
                    <Tr key={item.key}>
                      <Td>{item.data}</Td>
                      <Td>{item.fornecedor}</Td>
                      <Td>{item.descric}</Td>
                      <Td isNumeric>
                        {parseFloat(item.valor).toLocaleString("pt-br", {
                          minimumFractionDigits: 2,
                        })}
                      </Td>
                      <Td>
                        <HStack>
                          <Button
                            colorScheme="teal"
                            onClick={() => props.edit(item)}
                            // leftIcon={}
                          >
                            <FiEdit />
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => {
                              setIdDelete(item.key);
                              onOpen();
                            }}
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
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
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
