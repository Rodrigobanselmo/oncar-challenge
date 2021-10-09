import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Header } from "../components/shared/Header";
import { queryClient } from "../services/queryClient";
import { theme } from "../styles/theme";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
export default MyApp;