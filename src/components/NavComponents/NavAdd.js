import React, { ReactNode } from "react";
import {
  IconButton,
  Input,
  Avatar,
  Box,
  CloseButton,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  // Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Flex,
  Center,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiPlus,
  FiPlusCircle,
  FiPlusSquare,
  FiFilePlus,
} from "react-icons/fi";

export default function NavAdd(props) {
  return (
    <>
      {/* <Input width={"150"} type="tel" placeholder="Filtrar por Forcenedor" /> */}
      <Center>
        <InputGroup>
          <InputLeftElement pointerEvents="none" />
          <Input
            width={"150"}
            type="tel"
            placeholder="Filtrar por Forcenedor"
          />
        </InputGroup>
        <IconButton
          marginLeft="10"
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiSearch size="1.5em" />}
          onClick={() => {
            props.openFiltrar(true);
          }}
        />

        <IconButton
          marginLeft="10"
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiPlusCircle size="1.5em" />}
          onClick={props.show}
        />
      </Center>
    </>
  );
}
