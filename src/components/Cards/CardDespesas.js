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
} from "@chakra-ui/react";

export default function CardDespesas(props) {
  return (
    <Flex direction={"column"} alignItems="center">
      {props.dados.length > 0 ? (
        props.dados.map((item) => {
          return (
            <Box
              key={item.key}
              marginTop={10}
              borderWidth={2}
              borderColor={"gray.300"}
              width={{ base: "90%", md: "70%" }}
              p={5}
              shadow="md"
              borderRadius={"md"}
            >
              <Flex justifyContent={"space-between"}>
                <HStack spacing={"10px"}>
                  <Text>Data:</Text>
                  <Text>{item.data}</Text>
                </HStack>
                <HStack spacing={"10px"}>
                  <Text>Valor:</Text>
                  <Text>
                    {parseFloat(item.valor).toLocaleString("pt-br", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </HStack>
              </Flex>

              <HStack spacing={"10px"}>
                <Text>Fornecedor:</Text>
                <Text>{item.fornecedor}</Text>
              </HStack>
              <HStack spacing={"10px"}>
                <Text>Descrição:</Text>
                <Text>{item.descric}</Text>
              </HStack>
              <HStack spacing={"10px"}>
                <Text>Arquivo:</Text>
                <Text>
                  {item.fileURL ? (
                    <Badge variant="solid" colorScheme="green">
                      <a
                        href={item.fileURL}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        MOSTRAR
                      </a>
                    </Badge>
                  ) : (
                    <Badge variant="solid" colorScheme="red">
                      INDISPONÍVEL
                    </Badge>
                  )}
                </Text>
              </HStack>
              <Divider />
              <Flex justifyContent={"space-around"} marginTop={"5"}>
                <Button
                  colorScheme="teal"
                  width={"8rem"}
                  //   onClick={() => props.submit(fileRef)}
                >
                  Editar
                </Button>
                <Button width={"8rem"} colorScheme="red">
                  Excluir
                </Button>
              </Flex>

              <Flex direction={"row"}></Flex>
            </Box>
          );
        })
      ) : (
        <Text></Text>
      )}
    </Flex>
  );
}
