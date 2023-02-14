import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  HStack,
  Radio,
  Stack,
  Input,
  Box,
  Center,
  Collapse,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
import { useRef, useEffect } from "react";

export default function FiltrarDespesas(props) {
  const handleCancelar = () => {
    props.close(false);
    props.setInputFiltrar("");
  };

  const consulta = useRef(null);
  useEffect(() => {
    if (props.isOpen) {
      //Esse setTimeout foi colocado, pois tem que aguardar o componente aparecer
      //para poder dar foco nele
      setTimeout(() => {
        consulta.current.focus();
      }, 300);
    }
  }, [props.isOpen]);

  return (
    <Collapse in={props.isOpen} animateOpacity>
      <Center>
        <Box
          borderWidth={1}
          padding={10}
          borderColor="black"
          marginTop={10}
          width="90%"
          borderRadius={"md"}
          px={{ base: 2, md: 4 }}
          py={"5"}
          shadow={"lg"}
        >
          <Flex justifyContent={"flex-end"}>
            <CloseButton
              color={"#ffffff"}
              bgColor={"red"}
              size="md"
              onClick={() => handleCancelar()}
            />
          </Flex>
          <FormControl as="fieldset">
            <Stack spacing={3}>
              <FormLabel as="legend">Filtrar por:</FormLabel>

              <RadioGroup
                onChange={props.setFiltrarPor}
                value={props.filtrarPor}
                // defaultValue="fornecedor"
              >
                <HStack spacing="24px">
                  <Radio value="F">Fornecedor</Radio>
                  <Radio value="D">Descrição</Radio>
                </HStack>
              </RadioGroup>
              <Input
                value={props.inputFiltrar}
                onChange={(e) => {
                  props.setInputFiltrar(e.currentTarget.value);
                }}
                placeholder="consultar..."
                ref={consulta}
                size="md"
              />
              <FormHelperText>
                Escolha a forma de consulta de escreva...
              </FormHelperText>
            </Stack>
          </FormControl>
        </Box>
      </Center>
    </Collapse>
  );
}
