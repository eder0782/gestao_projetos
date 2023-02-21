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
                borderColor={"gray.300"}
                minW={"90%"}
                // p={5}
                // shadow="md"
                borderRadius={"md"}
              >
                <Skeleton fadeDuration={4} isLoaded={props.skeletonLoad}>
                  <Flex
                    width={"100%"}
                    // bg={"teal"}
                    backgroundColor="blackAlpha.900"
                    justifyContent={"center"}
                    height="3rem"
                    color={"white"}
                    paddingLeft={2}
                    paddingRight={2}
                    alignItems="center"
                  >
                    {/* <Text>Projeto:</Text> */}
                    <Text>{item.projeto}</Text>
                  </Flex>

                  <CardBody
                    align={"flex-start"}
                    // height={{ base: "auto", md: "8rem" }}
                  >
                    <Flex spacing={"10px"}>
                      <Text as={"b"} marginRight="10px">
                        Inicio:
                      </Text>
                      <Text>{item.inicio}</Text>
                    </Flex>
                    <Flex spacing={"10px"}>
                      <Text as={"b"} marginRight="10px">
                        Previsto:
                      </Text>
                      <Text>{item.vlrProjeto}</Text>
                    </Flex>
                  </CardBody>

                  {/* <CardFooter> */}
                  <CardFooter justifyContent={"space-around"}>
                    <Button
                      colorScheme="blue"
                      width={"8rem"}
                      onClick={() => props.edit(item)}
                      //   onClick={() => props.submit(fileRef)}
                    >
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
