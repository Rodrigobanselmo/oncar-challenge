import { ChakraProvider } from "@chakra-ui/react";
// import { theme } from "@chakra-ui/theme";

import { theme } from "../styles/theme";

import type { AppProps } from "next/app";
import { Header } from "../components/shared/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
