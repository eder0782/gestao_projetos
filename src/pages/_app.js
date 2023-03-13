import { ChakraProvider } from "@chakra-ui/react";
import ContextLogin from "@/services/contextLogin";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [logado, setLogado] = useState(0);
  return (
    <ChakraProvider>
      <ContextLogin.Provider value={[logado, setLogado]}>
        <Component {...pageProps} />
      </ContextLogin.Provider>
    </ChakraProvider>
  );
}

export default MyApp;

// import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
// // `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
// import chakraTheme from '@chakra-ui/theme'

// const { Button } = chakraTheme.components

// const theme = extendBaseTheme({
//   components: {
//     Button,
//   },
// })

// export default function App({ Component, pageProps }) {
//   return(
//   <ChakraBaseProvider theme={theme}>
//       <Component {...pageProps} />
//     </ChakraBaseProvider>

//   )
// }
