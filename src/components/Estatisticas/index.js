import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer, FiArchive, FiDollarSign } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";

// interface StatsCardProps {
//   title: string;
//   stat: string;
//   icon: ReactNode;
// }
function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel>{title}</StatLabel>
          <StatNumber>{stat}</StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics(props) {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid
        // justifyContent={"center"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 5, lg: 20 }}
        // justifyContent="space-between"
      >
        <StatsCard
          title={"No. de Lançamentos:"}
          stat={props.totalItens}
          icon={<FiArchive size={"2em"} />}
        />
        {/* <StatsCard
            title={'Servers'}
            stat={'1,000'}
            icon={<FiServer size={'3em'} />}
          /> */}
        <StatsCard
          title={"Valor Total:"}
          stat={props.valorTotal}
          icon={<FiDollarSign size={"2em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
