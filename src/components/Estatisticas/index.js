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
import { FiServer } from "react-icons/fi";
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
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
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

export default function BasicStatistics() {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      {/* <Flex
        // width="100%"
        bg="#285E61"
        justifyContent={{
          base: "center",
          // sm: "space-between",
          md: "space-between",
          lg: "space-between",
        }}
        alignItems="center"
        p="2"
        marginBottom="10"
        flexWrap="wrap"
        // as=
      >
        <Text
          fontSize={{ base: "2xl", lg: "4xl" }}
          // marginRight={{ base: "15" }}
          marginBottom={{ base: "15" }}
        >
          Planilha de Lançamentos
        </Text>
        <Stack direction="row" spacing={4}>
          <Button
            leftIcon={<Search2Icon />}
            colorScheme="teal"
            variant="outline"
          >
            Pesquisar
          </Button>
          <Button
            leftIcon={<AddIcon />}
            variant="outline"
            colorScheme="teal"
            variant="outline"
          >
            Novo
          </Button>
        </Stack>
      </Flex> */}
      <SimpleGrid
        // justifyContent={"center"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 5, lg: 20 }}
        // justifyContent="space-between"
      >
        <StatsCard
          title={"Users"}
          stat={"5,000"}
          icon={<BsPerson size={"3em"} />}
        />
        {/* <StatsCard
            title={'Servers'}
            stat={'1,000'}
            icon={<FiServer size={'3em'} />}
          /> */}
        <StatsCard
          title={"Datacenters"}
          stat={"7"}
          icon={<GoLocation size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
