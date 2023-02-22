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
import { useRouter } from "next/router";

export default function CardProjetos(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idDelete, setIdDelete] = useState(null);
  const initialRef = useRef(null);
  const routes = useRouter();
  // console.log(props.dados)
  const deletar = () => {
    props.delete(idDelete);
    onClose();
  };
  const redirecionar = (projId, projName) => {
    routes(`/lançamentos/${projId}`);
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
                        <HStack justifyContent={"center"}>
                          <Icon
                            color={"black"}
                            h={5}
                            w={5}
                            as={FaProjectDiagram}
                            marginRight={4}
                          />
                          <Text
                            color={"black"}
                            fontSize={{ base: 16, md: 20 }}
                            fontWeight={"bold"}
                            whiteSpace={"pre-wrap"}
                            // minH={20}
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
                        md: "space-around",
                      }}
                    >
                      <VStack spacing={"10px"}>
                        <HStack>
                          <Icon color={"gray"} h={3} w={3} as={FaChartLine} />
                          <Text
                            color={"gray"}
                            fontSize={{ base: 12, md: 15 }}
                            fontWeight={"bold"}
                          >
                            VLR PREVISTO:
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon color={"black"} h={5} w={5} as={FaDollarSign} />
                          <Text color={"black"} fontSize={{ base: 17, md: 20 }}>
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
                          <Icon color={"gray"} h={3} w={3} as={FaCheckDouble} />
                          <Text
                            color={"gray"}
                            fontSize={{ base: 12, md: 15 }}
                            fontWeight={"bold"}
                          >
                            VLR REALIZADO:
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon color={"black"} h={5} w={5} as={FaDollarSign} />
                          <Text color={"black"} fontSize={{ base: 17, md: 20 }}>
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
                    <Link href={`/lancamentos/${item.key}/?projName=${item.projeto}`}>
                      <Button
                        leftIcon={FaRegFolderOpen}
                        width={"8rem"}
                        colorScheme="blue"
                        variant="outline"
                      >
                        {/* <Link href={`/lancamentos/${item.key}`}> */}
                        <Icon marginRight={3} as={FaRegFolderOpen} />
                        Abrir
                        {/* </Link> */}
                      </Button>
                    </Link>
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
