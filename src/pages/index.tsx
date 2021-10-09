import { Box, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

import { CarCard } from "../components/shared/Cards/Car";
import { CarSkeleton } from "../components/shared/Cards/CarSkeleton";
import { CarFilter } from "../components/shared/Filters/CarFilter";
import { Pagination } from "../components/shared/Pagination";
import { useCars } from "../services/hooks/Queries/useCars";

import type { NextPage } from "next";
import { PageContainer } from "../components/shared/Container";

const Home: NextPage = () => {
  const [page, setPage] = React.useState(1);
  const limit = useBreakpointValue({ sm: 5, md: 6, xl: 10 });
  const { data, isLoading } = useCars(page, limit);
  return (
    <PageContainer>
      <Head>
        <title>Oncar</title>
        <meta
          name="description"
          content="financiamento de carros e simulação de crédito"
        />
      </Head>

      <Box
        as="main"
        maxW={"container.xl"}
        m="auto"
        mb={20}
        px={["3rem", null, "4rem"]}
        pt={20}
      >
        <CarFilter />

        <SimpleGrid pt={20} columns={[1, 1, 1, 1, 2]} gap={"20px 15px"}>
          {data && data.cars.map((car) => <CarCard key={car.id} car={car} />)}
          {isLoading &&
            Array.from(Array(10).keys()).map((i) => <CarSkeleton key={i} />)}
        </SimpleGrid>
        <Pagination
          onPageChange={setPage}
          totalCountOfRegisters={1000}
          currentPage={page}
          registersPerPage={10}
          siblingsCount={3}
        />
      </Box>
      <footer></footer>
    </PageContainer>
  );
};

export default Home;
