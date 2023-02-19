import {
  Box,
  List,
  ListItem,
  Button,
  useColorMode,
  Text,
  Collapse,
  HStack,
  useDisclosure,
  Flex,
  Icon,
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
} from "@chakra-ui/react";
import { FiEdit, FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";

import { useState, useRef } from "react";

function CollapseButton(props) {
  return (
    <HStack>
      <Button
        // height={8}

        colorScheme="blue"
        onClick={() => props.edit(props.item)}
        // leftIcon={}
      >
        <FiEdit />
      </Button>
      <Button
        // height={8}
        colorScheme="purple"
        onClick={() => {
          props.setIdDelete(props.itemKey);
          props.onOpen();
        }}
        //leftIcon={}
      >
        <FiTrash2 />
      </Button>
    </HStack>
  );
}

function ItemList(props) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <ListItem
      borderRadius={"md"}
      borderWidth={2}
      borderColor={"gray.300"}
      //   bg={"gray.400"}
    >
      <Flex flexDir={"column"} justifyContent={"space-between"}>
        <Box width="100%">
          <HStack
            bg={"blackAlpha.900"}
            height={"100%"}
            justifyContent={"space-between"}
            spacing={20}
            borderTopRightRadius={"md"}
            borderTopLeftRadius={"md"}
            p={2}
          >
            <HStack>
              {/* <Text fontWeight={"bold"} fontSize="md" color="white">
                Data:
              </Text> */}
              <Text fontWeight={"bold"} fontSize="md" color="white">
                {props.data}
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight={"bold"} fontSize="md" color="white">
                Valor:
              </Text>
              <Text fontWeight={"bold"} fontSize="md" color="white">
                {parseFloat(props.valor).toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </HStack>
          </HStack>
          <Text
            paddingLeft={2}
            paddingRight={2}
            color="blak"
            fontWeight={"bold"}
            fontSize={"14px"}
          >
            {props.fornecedor}
          </Text>
          <Text
            paddingLeft={2}
            paddingRight={2}
            color="blak"
            fontWeight={"bold"}
            fontSize={"14px"}
          >
            {props.descric}
          </Text>
        </Box>
        <Box
          width={"100%"}
          onClick={onToggle}
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Icon
            color="blak"
            fontWeight={"bold"}
            as={isOpen ? FiChevronUp : FiChevronDown}
            w={8}
            h={8}
          />
        </Box>
      </Flex>
      <Box>
        <Collapse in={isOpen} animateOpacity>
          <Box p={2}>
            <HStack justifyContent={"space-between"}>
              {props.fileURL ? (
                <Text color="blak" fontWeight={"bold"}>
                  Documento:{" "}
                  <Badge variant="solid" colorScheme="blue">
                    <a
                      href={props.fileURL}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      MOSTRAR
                    </a>
                  </Badge>
                </Text>
              ) : (
                <Text color="blak" fontWeight={"bold"}>
                  Documento:{" "}
                  <Badge variant="solid" colorScheme="purple">
                    INDISPONÍVEL
                  </Badge>
                </Text>
              )}

              <CollapseButton
                onOpen={props.onOpen}
                setIdDelete={props.setIdDelete}
                itemKey={props.itemKey}
                item={props.item}
                edit={props.edit}
              />
            </HStack>
          </Box>
        </Collapse>
      </Box>
    </ListItem>
  );
}

export default function ListView(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idDelete, setIdDelete] = useState(null);
  const initialRef = useRef(null);

  const deletar = () => {
    props.delete(idDelete);
    onClose();
  };

  return (
    <Box position="relative" padding={5} h="100vh">
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

      <Box>
        <List size="xl" spacing={5}>
          {props.dados.length > 0 ? (
            props.dados.map((item) => {
              return (
                <Skeleton
                  key={item.key}
                  x
                  fadeDuration={4}
                  isLoaded={props.skeletonLoad}
                >
                  <ItemList
                    valor={item.valor}
                    descric={item.descric}
                    fornecedor={item.fornecedor}
                    data={item.data}
                    setIdDelete={setIdDelete}
                    onOpen={onOpen}
                    itemKey={item.key}
                    item={item}
                    edit={props.edit}
                    fileURL={item.fileURL}
                  />
                </Skeleton>
              );
            })
          ) : (
            <Text></Text>
          )}
        </List>
      </Box>
    </Box>
  );
}
