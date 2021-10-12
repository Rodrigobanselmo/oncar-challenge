import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Header } from "../components/shared/Header";
import { AuthProvider } from "../context/AuthContext";
import { queryClient } from "../services/queryClient";
import { theme } from "../styles/theme";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>

        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </AuthProvider>
  );
}
export default MyApp;
