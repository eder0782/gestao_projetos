import { useRef, useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";
import { FaSave, FaBan } from "react-icons/fa";

export default function FormProjetos(props) {
  const inpRef = useRef(null);
  const fileRef = useRef(null);
  function Cancelar() {
    props.setInicio("");
    props.setProjeto("");
    props.setVlrProjeto("");

    props.close();
  }

  //ESSE USEEFFECT MONITORA SE O COMPONENTE ESTÁ VISÍVEL PARA PODER DAR FOCO
  useEffect(() => {
    if (props.isOpen) {
      //Esse setTimeout foi colocado, pois tem que aguardar o componente aparecer
      //para poder dar foco nele
      //   setFileName([]);
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
            <FormLabel>Projeto</FormLabel>
            <Input
              ref={inpRef}
              value={props.projeto.toUpperCase()}
              onChange={(e) =>
                //converte o valor para maiusculo
                props.setProjeto(e.currentTarget.value.toUpperCase())
              }
              type="text"
              borderColor={"blackAlpha.600"}
              placeholder="Nome do Projeto...."
            />

            <Flex justifyContent={"space-between"}>
              <Box>
                <FormLabel>Data Inicio</FormLabel>
                <Input
                  // defaultValue={Date.now()}
                  value={props.inicio}
                  onChange={(e) => props.setInicio(e.currentTarget.value)}
                  type="date"
                  borderColor={"blackAlpha.600"}
                />
              </Box>
              <Box marginLeft={5}>
                <FormLabel>Vlr Projeto</FormLabel>
                <Input
                  value={props.vlrProjeto}
                  onChange={(e) => props.setVlrProjeto(e.currentTarget.value)}
                  type="number"
                  placeholder="1200,50"
                  borderColor={"blackAlpha.600"}
                />
              </Box>
            </Flex>
            <FormLabel>Arquivo</FormLabel>

            <Flex justifyContent={"space-around"} marginTop={"5"}>
              <Button
                colorScheme="blue"
                width={"8rem"}
                onClick={() => props.submit()}
              >
                <Icon as={FaSave} marginRight={3} />
                Salvar
              </Button>
              <Button width={"8rem"} colorScheme="purple" onClick={Cancelar}>
                <Icon as={FaBan} marginRight={3} />
                Cancelar
              </Button>
            </Flex>
          </form>
        </FormControl>
      </Box>
    </Collapse>
  );
}
