import { Center, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import type { NextPage } from "next";
const Home: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    toast({
      title: `Página não encontrada`,
      status: "warning",
      description: "Você será redirecionado de volta em 3 segundos.",
      duration: 3500,
      position: "top-right",
      onCloseComplete: () => router.back(),
    });
  }, []);

  return <Center h="100vh">404 - Page Not Found</Center>;
};

export default Home;
