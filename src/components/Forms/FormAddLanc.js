import { useRef, useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";

export default function FormAddLanc(props) {
  const [fileName, setFileName] = useState([]);
  const inpRef = useRef(null);
  const fileRef = useRef(null);
  function Cancelar() {
    props.setData("");
    props.setFornecedor("");
    props.setDescric("");
    props.setValor("");
    props.setFileURL("");
    props.setEditMode("");
    props.close();
  }

  //ESSE USEEFFECT MONITORA SE O COMPONENTE ESTÁ VISÍVEL PARA PODER DAR FOCO
  useEffect(() => {
    if (props.isOpen) {
      //Esse setTimeout foi colocado, pois tem que aguardar o componente aparecer
      //para poder dar foco nele
      setFileName([]);
      setTimeout(() => {
        inpRef.current.focus();
      }, 200);
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
          <form>
            <FormLabel>Fornecedor</FormLabel>
            <Input
              ref={inpRef}
              value={props.fornecedor.toUpperCase()}
              onChange={(e) =>
                //converte o valor para maiusculo
                props.setFornecedor(e.currentTarget.value.toUpperCase())
              }
              type="text"
              borderColor={"blackAlpha.600"}
              placeholder="Fornecedor...."
            />
            <FormLabel>Descrição</FormLabel>
            <Input
              value={props.descric.toLowerCase()}
              onChange={(e) =>
                //converte o texto para minúsculo
                props.setDescric(e.currentTarget.value.toLowerCase())
              }
              borderColor={"blackAlpha.600"}
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
                  borderColor={"blackAlpha.600"}
                />
              </Box>
              <Box marginLeft={5}>
                <FormLabel>Valor</FormLabel>
                <Input
                  value={props.valor}
                  onChange={(e) => props.setValor(e.currentTarget.value)}
                  type="number"
                  placeholder="1200,50"
                  borderColor={"blackAlpha.600"}
                />
              </Box>
            </Flex>
            <FormLabel>Arquivo</FormLabel>
            <Input
              type="file"
              value={fileName}
              onChange={(e) => {
                setFileName(e.currentTarget.value);
              }}
              ref={fileRef}
              borderColor={"blackAlpha.600"}
            />
            <Flex justifyContent={"space-around"} marginTop={"5"}>
              <Button
                colorScheme="teal"
                width={"8rem"}
                onClick={() => props.submit(fileRef)}
              >
                Salvar
              </Button>
              <Button width={"8rem"} colorScheme="red" onClick={Cancelar}>
                Cancelar
              </Button>
            </Flex>
          </form>
        </FormControl>
      </Box>
    </Collapse>
  );
}
