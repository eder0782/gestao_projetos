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

  function Cancelar() {
    props.setData("");
    props.setFornecedor("");
    props.setDescric("");
    props.setValor("");
    props.show();
  }
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
            value={props.fornecedor}
            onChange={(e) => props.setFornecedor(e.currentTarget.value)}
            type="text"
            placeholder="Fornecedor...."
          />
          <FormLabel>Descrição</FormLabel>
          <Input
            value={props.descric}
            onChange={(e) => props.setDescric(e.currentTarget.value)}
            type="text"
            placeholder="Descrição"
          />
          <Flex justifyContent={"space-between"}>
            <Box>
              <FormLabel>Data</FormLabel>
              <Input onChange={props.setData} type="date" />
            </Box>
            <Box marginLeft={5}>
              <FormLabel>Valor</FormLabel>
              <Input
                value={valor}
                onChange={props.setValor}
                type="number"
                placeholder="1200,50"
              />
            </Box>
          </Flex>
          <Flex justifyContent={"space-around"} marginTop={"5"}>
            <Button colorScheme="red" onClick={Cancelar}>
              Cancelar
            </Button>
            <Button colorScheme="teal" onClick={props.submit}>
              Salvar
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Collapse>
  );
}
