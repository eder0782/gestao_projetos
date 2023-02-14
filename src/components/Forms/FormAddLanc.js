import { useRef, useEffect, useState } from "react";

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
  const inpRef = useRef(null);

  function Cancelar() {
    props.setData("");
    props.setFornecedor("");
    props.setDescric("");
    props.setValor("");
    props.close();
  }

  //ESSE USEEFFECT MONITORA SE O COMPONENTE ESTÁ VISÍVEL PARA PODER DAR FOCO
  useEffect(() => {
    if (props.isOpen) {
      //Esse setTimeout foi colocado, pois tem que aguardar o componente aparecer
      //para poder dar foco nele
      setTimeout(() => {
        inpRef.current.focus();
      }, 500);
    }
  }, [props.isOpen]);

  return (
    <Collapse in={props.isOpen} animateOpacity>
      <Box
        borderRadius={"md"}
        border="1px"
        padding="5"
        borderColor="blackAlpha.900"
        maxWidth="500"
        marginTop={"5"}
        shadow={"lg"}
        px={{ base: 2, md: 7 }}
        py={"5"}
        // p="6"
        rounded="md"
      >
        <FormControl width="300" isRequired>
          <FormLabel>Fornecedor</FormLabel>
          <Input
            ref={inpRef}
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
              <Input
                // defaultValue={Date.now()}
                value={props.data}
                onChange={(e) => props.setData(e.currentTarget.value)}
                type="date"
              />
            </Box>
            <Box marginLeft={5}>
              <FormLabel>Valor</FormLabel>
              <Input
                value={props.valor}
                onChange={(e) => props.setValor(e.currentTarget.value)}
                type="number"
                placeholder="1200,50"
              />
            </Box>
          </Flex>
          <Flex justifyContent={"space-around"} marginTop={"5"}>
            <Button colorScheme="teal" onClick={props.submit}>
              Salvar
            </Button>
            <Button colorScheme="red" onClick={Cancelar}>
              Cancelar
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Collapse>
  );
}
