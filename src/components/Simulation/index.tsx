import { Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { MainContainer } from "../shared/Container/Main";

export function MainSimulation(): JSX.Element {
  // const [page, setPage] = React.useState(1);
  // const limit = useBreakpointValue({ sm: 5, md: 6, xl: 10 });
  // const { data, isLoading } = useCars(page, limit, filters);

  // const handleChangePage = (page: number) => {
  //   scroll.scrollTo(0, {
  //     duration: 800,
  //     smooth: true,
  //     containerId: "home_page",
  //   });
  //   setPage(page);
  // };

  return (
    <MainContainer>
      <Heading textAlign="center" mb={1}>
        QUERO AVALIAR MEU CRÉDITO
      </Heading>
      <Text as="h2" fontSize="xl" textAlign="center" mb={6}>
        Aqui na Oncar, facilitamos a sua aprovação, mesmo com restrição no nome.
      </Text>
    </MainContainer>
  );
}
