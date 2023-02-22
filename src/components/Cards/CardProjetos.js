import {
  Box,
  Center,
  Flex,
  Text,
  HStack,
  VStack,
  Stack,
  Button,
  Divider,
  Badge,
  useDisclosure,
  Skeleton,
  Icon,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import {
  FaTrash,
  FaBan,
  FaProjectDiagram,
  FaExclamationCircle,
  FaEdit,
  FaRegCalendarCheck,
  FaChartLine,
  FaDollarSign,
  FaCheckDouble,
  // FaEye,
  FaRegFolderOpen,
} from "react-icons/fa";
import Link from "next/link";

export default function CardProjetos(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idDelete, setIdDelete] = useState(null);
  const initialRef = useRef(null);
  // console.log(props.dados)
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
          <ModalHeader>
            <HStack spacing={3}>
              <Icon color={"red"} as={FaExclamationCircle} />
              <Text>Confirmar Exclusão!!</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>
              Após a exclusão o lançamento não poderá mais ser restaurado.
              Deseja realmente Exluir??
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={deletar} colorScheme="blue" mr={3}>
              <Icon as={FaTrash} marginRight={3} /> Sim
            </Button>
            <Button ref={initialRef} onClick={onClose} colorScheme="purple">
              <Icon as={FaBan} marginRight={3} />
              Não
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        direction={"row"}
        w="100%"
        justifyContent={"space-evenly"}
        wrap={"wrap"}
      >
        {props.dados.length > 0 ? (
          props.dados.map((item) => {
            return (
              // <Skeleton fadeDuration={4} isLoaded={props.skeletonLoad}>
              <Card
                key={item.key}
                marginTop={"10"}
                borderWidth={2}
                borderColor={"gray"}
                w={{ base: "100%", lg: "60%" }}
                // p={5}
                // shadow="md"
                borderRadius={"md"}
              >
                <Skeleton fadeDuration={4} isLoaded={props.skeletonLoad}>
                  <CardHeader>
                    <HStack justifyContent={"space-between"}>
                      <VStack alignItems={"flex-start"}>
                        <HStack>
                          <Icon
                            color={"black"}
                            h={5}
                            w={5}
                            as={FaProjectDiagram}
                            marginRight={4}
                          />
                          <Text
                            color={"black"}
                            fontSize={20}
                            fontWeight={"bold"}
                            whiteSpace={"pre-wrap"}
                          >
                            {item.projeto}
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon
                            color={"gray"}
                            h={3}
                            w={3}
                            as={FaRegCalendarCheck}
                            marginRight={4}
                          />
                          <Text
                            color={"gray"}
                            fontSize={12}
                            fontWeight={"bold"}
                          >
                            INICIO:
                          </Text>
                          <Text
                            color={"gray"}
                            fontSize={12}
                            fontWeight={"bold"}
                          >
                            {item.inicio}
                          </Text>
                        </HStack>
                      </VStack>

                      <Button colorScheme="blue" variant="outline">
                        <Link href={`/lancamentos/${item.key}`}>
                          Abrir
                          <Icon
                            marginLeft={2}
                            h={5}
                            w={5}
                            as={FaRegFolderOpen}
                          />
                        </Link>
                      </Button>
                    </HStack>

                    <Divider
                      style={{ border: "1px solid", borderColor: "gray.300" }}
                    />
                  </CardHeader>
                  <CardBody
                    align={"flex-end"}
                    // height={{ base: "auto", md: "8rem" }}
                  >
                    <HStack
                      justifyContent={{
                        base: "space-between",
                        lg: "space-around",
                      }}
                    >
                      <VStack spacing={"10px"}>
                        <HStack>
                          <Icon
                            color={"gray"}
                            h={3}
                            w={3}
                            as={FaChartLine}
                            marginRight={4}
                          />
                          <Text
                            color={"gray"}
                            fontSize={15}
                            fontWeight={"bold"}
                          >
                            VLR PREVISTO:
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon
                            color={"black"}
                            h={5}
                            w={5}
                            as={FaDollarSign}
                            marginRight={4}
                          />
                          <Text color={"black"} fontSize={20}>
                            {parseFloat(item.vlrProjeto).toLocaleString(
                              "pt-br",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </Text>
                        </HStack>
                      </VStack>
                      <VStack spacing={"10px"}>
                        <HStack>
                          <Icon
                            color={"gray"}
                            h={3}
                            w={3}
                            as={FaCheckDouble}
                            marginRight={4}
                          />
                          <Text
                            color={"gray"}
                            fontSize={15}
                            fontWeight={"bold"}
                          >
                            VLR REALIZADO:
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon
                            color={"black"}
                            h={5}
                            w={5}
                            as={FaDollarSign}
                            marginRight={4}
                          />
                          <Text color={"black"} fontSize={20}>
                            {parseFloat(item.vlrRealizado).toLocaleString(
                              "pt-br",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  </CardBody>

                  {/* <CardFooter> */}
                  <CardFooter justifyContent={"space-around"}>
                    <Button
                      colorScheme="blue"
                      width={"8rem"}
                      onClick={() => props.edit(item)}
                      //   onClick={() => props.submit(fileRef)}
                    >
                      <Icon as={FaEdit} marginRight={3} />
                      Editar
                    </Button>
                    <Button
                      width={"8rem"}
                      onClick={() => {
                        setIdDelete(item.key);
                        onOpen();
                      }}
                      colorScheme="purple"
                    >
                      <Icon as={FaTrash} marginRight={3} />
                      Excluir
                    </Button>
                    {/* </Flex> */}
                  </CardFooter>
                </Skeleton>
              </Card>
              // </Skeleton>
            );
          })
        ) : (
          <Text></Text>
        )}
      </Flex>
    </Center>
  );
}
