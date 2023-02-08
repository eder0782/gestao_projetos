import { ChakraProvider } from "@chakra-ui/react";



function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

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
