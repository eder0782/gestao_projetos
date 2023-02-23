import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
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
  Stack,
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
  FiChevronDown,
  FiPlus,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  ref: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Projetos", icon: FiHome, ref: "/projetos" },
  { name: "Fornecedores", icon: FiTrendingUp, ref: "/fornecedor" },
  { name: "Lançamentos", icon: FiCompass, ref: "/lancamentos" },
  { name: "Favourites", icon: FiStar, ref: "#" },
  { name: "Settings", icon: FiSettings, ref: "#" },
];

export default function SidebarWithHeader({
  children1,
  children2,
  childrenBtn,
  childrenAdd,
  childrenFiltraLanc,
  numLancamentos,
  vlrTotal,
  tituloPagina,
}: {
  children1: ReactNode;
  children2: ReactNode;
  childrenBtn: ReactNode;
  childrenAdd: ReactNode;
  childrenFiltraLanc: ReactNode;
  numLancamentos: ReactNode;
  vlrTotal: ReactNode;
  tituloPagina: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        zIndex={3}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        onOpen={onOpen}
        child={childrenBtn}
        valorTotal={vlrTotal}
        numLanc={numLancamentos}
        backgroundColor="blackAlpha.900"
        titulo={tituloPagina}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* <Box marginTop={50}>{children1}</Box> */}
        <Box
          display={"flex"}
          justifyContent="center"
          marginTop={{base:'6rem',lg:'2rem'}}
          // alignItems="center"
          // bg={"red"}
        >
          {childrenAdd}
        </Box>
        {childrenFiltraLanc}

        {children2}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("blackAlpha.900", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          color={"white"}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Logo
        </Text>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          color={"white"}
          onClick={onClose}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          reference={link.ref}
          close={onClose}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({
  icon,
  reference,
  close,
  children,
  ...rest
}: NavItemProps) => {
  return (
    <Link
      href={reference}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={close}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={"white"}
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text color={"white"}>{children}</Text>
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  child: ReactNode;
  valorTotal: ReactNode;
  numLanc: ReactNode;
  titulo: ReactNode
}
const MobileNav = ({
  onOpen,
  child,
  valorTotal,
  numLanc,
  titulo,
  ...rest
}: MobileProps) => {
  return (
    <Box display={"block"} position="fixed" width={"100%"} zIndex={2}>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        minH={'3rem'}
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between",md:'flex-end', lg: "space-between" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
          color={"white"}
          _hover={{
            background: "white",
            color: "black",
          }}
        />
        <Flex display={{base:'none', lg:'flex'}} flexDir={{xl:'row',lg:'column'}}>
        <Text fontWeight={'bold'}color={'white'} marginRight={2} fontSize={15} >{titulo}</Text>
        <Flex>
              {numLanc ? (
                <HStack spacing={1}>
                  <Text fontSize={15} fontWeight={'bold'}  color={"white"}>|</Text>
                  <Text marginLeft={3} color={"white"} fontSize={15} as={"b"}>
                    Nº Lanc:
                  </Text>
                  <Text fontSize={15} fontWeight={'bold'}  color={"white"}>{numLanc}</Text>
                </HStack>
              ) : (
                <></>
              )}
              {valorTotal ? (
                <HStack marginLeft={5} marginRight={5} spacing={1}>
                  <Text fontSize={15} color={"white"} as={"b"}>
                    Vlr Total:
                  </Text>
                  <Text fontSize={15} fontWeight={'bold'} color={"white"}>{valorTotal}</Text>
                </HStack>
              ) : (
                <></>
              )}
            </Flex>


        </Flex>
        
        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            justifyContent={"flex-end"}
            alignItems={{ base: "flex-end", md: "center" }}
          >
            
            {child}
          </Flex>
          {/* <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              ></MenuButton>
            </Menu>
          </Flex> */}
        </HStack>
      </Flex>
      <Box ml={{ base: 0, md: 60 }} display={{base:'flex', lg:'none'}} justifyContent={'flex-start'} bg={"blackAlpha.900"} flexDir={'column'}>
        <Text padding={2} fontWeight={'bold'}color={'white'} fontSize={15} >

          {titulo}
        </Text>
        <Flex>
              {numLanc ? (
                <HStack paddingLeft={2} spacing={3}>
                  <Text fontWeight={'bold'}color={'white'} fontSize={15}>
                    Nº Lanc:
                  </Text>
                  <Text fontWeight={'bold'}color={'white'} fontSize={15}>{numLanc}</Text>
                </HStack>
              ) : (
                <></>
              )}
              {valorTotal ? (
                <HStack marginLeft={5} marginRight={5} spacing={3}>
                  <Text fontWeight={'bold'}color={'white'} fontSize={15}>
                    Vlr Total:
                  </Text>
                  <Text  fontWeight={'bold'}color={'white'} fontSize={15}>{valorTotal}</Text>
                </HStack>
              ) : (
                <></>
              )}
            </Flex>


      </Box>
    </Box>
  );
};
