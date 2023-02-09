import { useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";

export default function FormAddLanc(props) {
  const [data, setData] = useState(null);
  const [fornecedor, setFornecedor] = useState(null);
  const [descric, setDescric] = useState(null);
  const [valor, setValor] = useState(null);
  return (
    <Collapse in={props.isOpen} animateOpacity>
      <Box
        borderRadius={"md"}
        border="1px"
        padding="5"
        borderColor="blackAlpha.900"
        maxWidth="500"
        marginTop={"5"}
        shadow={"dark-lg"}
        p="6"
        rounded="md"
      >
        <FormControl width="300" isRequired>
          <FormLabel>Fornecedor</FormLabel>
          <Input
            value={fornecedor}
            onChange={(e) => setFornecedor(e.currentTarget.value)}
            type="text"
            placeholder="Fornecedor...."
          />
          <FormLabel>Descrição</FormLabel>
          <Input
            value={descric}
            onChange={(e) => setDescric(e.currentTarget.value)}
            type="text"
            placeholder="Descrição"
          />
          <Flex justifyContent={"space-between"}>
            <Box>
              <FormLabel>Data</FormLabel>
              <Input value={data} type="date" />
            </Box>
            <Box marginLeft={5}>
              <FormLabel>Valor</FormLabel>
              <Input type="number" placeholder="1200,50" />
            </Box>
          </Flex>
          <Flex justifyContent={"space-around"} marginTop={"5"}>
            <Button colorScheme="red" onClick={props.show}>
              Cancelar
            </Button>
            <Button colorScheme="teal">Salvar</Button>
          </Flex>
        </FormControl>
      </Box>
    </Collapse>
  );
}
