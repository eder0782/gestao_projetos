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
  Badge,
  Skeleton,
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

  const formatData = (data) => {
    let data_format = new Date(data);
    data_format.setDate(data_format.getDate() + 1);
    // console.log(props.data);
    // console.log(data_format);
    return data_format.toLocaleDateString();
  };

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
        <Skeleton fadeDuration={4} isLoaded={props.skeletonLoad}>
          <TableContainer>
            <Table variant="striped" colorScheme="blackAlpha">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead bg={"blackAlpha.900"}>
                <Tr>
                  <Th color={"white"}>Data</Th>
                  <Th color={"white"}>Fornecedor</Th>
                  <Th color={"white"}>Descrição</Th>
                  <Th isNumeric color={"white"}>
                    Valor
                  </Th>
                  <Th color={"white"}>Arquivo</Th>
                  <Th color={"white"}>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.dados.length > 0 ? (
                  props.dados.map((item) => {
                    return (
                      <Tr key={item.key}>
                        <Td fontSize={15}>{formatData(item.data)}</Td>
                        <Td whiteSpace={"pre-wrap"} fontSize={12}>
                          {item.fornecedor}
                        </Td>
                        <Td whiteSpace={"pre-wrap"} fontSize={15}>
                          {item.descric}
                        </Td>
                        <Td isNumeric>
                          {parseFloat(item.valor).toLocaleString("pt-br", {
                            minimumFractionDigits: 2,
                          })}
                        </Td>
                        <Td>
                          {item.fileURL ? (
                            <Badge variant="solid" colorScheme="blue">
                              <a
                                href={item.fileURL}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                MOSTRAR
                              </a>
                            </Badge>
                          ) : (
                            <Badge variant="solid" colorScheme="purple">
                              INDISPONÍVEL
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          <HStack>
                            <Button
                              colorScheme="blue"
                              onClick={() => props.edit(item)}
                              // leftIcon={}
                            >
                              <FiEdit />
                            </Button>
                            <Button
                              colorScheme="purple"
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
        </Skeleton>
      </Box>
    </Center>
  );
}

export default Tabela;
