import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { auth } from "@/services/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState, useEffect, useContext } from "react";
import ContextLogin from "@/services/contextLogin";
import { useRouter } from "next/router";

export default function SimpleCard() {
  const [logado, setLogado] = useContext(ContextLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const autentiCar = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(email, password);
    }
  };

  // useEffect(() => {
  //   if (logado !== 0) {
  //     router.replace("/projetos");
  //   }
  // }, [logado]);

  // useEffect(() => {
  //   // if (logado !== 0) {
  //   //   router.replace("/projetos");
  //   // }
  //   console.log(logado);
  // }, [logado]);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    setLogado(true);
    // console.log(logado);
    // router.replace("/projetos");
  }

  // const color = useColorModeValue("gray.50", "gray.800");
  // const color2 = useColorModeValue("white", "gray.700");

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading color={"blue.500"} fontSize={"4xl"}>
            Faça login em sua conta
          </Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text> */}
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"2xl"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Lembrar-me</Checkbox>
                <Link color={"blue.400"}>Esqueceu a senha?</Link>
              </Stack>
              <Button
                onClick={autentiCar}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
