import React, { ReactNode } from "react";
import { IconButton, Center } from "@chakra-ui/react";
import Link from "next/link";
import {
  FiRefreshCcw,
  FiSearch,
  FiPlusCircle,
  FiPrinter,
} from "react-icons/fi";

export default function NavAdd(props) {
  return (
    <Center>
      {/* <InputGroup>
        <InputLeftElement pointerEvents="none" />
        <Input width={"150"} type="tel" placeholder="Filtrar por Forcenedor" />
      </InputGroup> */}
      <IconButton
        marginLeft={{ base: "2", md: "10" }}
        size="lg"
        variant="ghost"
        aria-label="open menu"
        colorScheme={"blackAlpha"}
        icon={<FiRefreshCcw style={{ color: "white" }} size="1.5em" />}
        onClick={() => {
          props.updateForm();
        }}
      />
      <IconButton
        marginLeft={{ base: "2", md: "10" }}
        size="lg"
        variant="ghost"
        aria-label="open menu"
        colorScheme={"blackAlpha"}
        icon={<FiSearch style={{ color: "white" }} size="1.5em" />}
        onClick={() => {
          props.openFiltrar(!props.isOpenFiltrar);
        }}
      />

      <IconButton
        marginLeft={{ base: "2", md: "10" }}
        size="lg"
        variant="ghost"
        aria-label="open menu"
        colorScheme={"blackAlpha"}
        icon={
          <FiPlusCircle
            style={{ color: "white" }}
            _hover={{ color: "black" }}
            size="1.5em"
          />
        }
        onClick={props.show}
      />
      <IconButton
        marginLeft={{ base: "2", md: "10" }}
        size="lg"
        variant="ghost"
        aria-label="open menu"
        colorScheme={"blackAlpha"}
        icon={
          <FiPrinter
            style={{ color: "white" }}
            _hover={{ color: "black" }}
            size="1.5em"
          />
        }
        onClick={props.print}
      />
    </Center>
  );
}
