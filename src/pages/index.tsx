import { Box, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

import { CarCard } from "../components/shared/Cards/Car";
import { CarSkeleton } from "../components/shared/Cards/CarSkeleton";
import { CarFilter } from "../components/shared/Filters/CarFilter";
import { Pagination } from "../components/shared/Pagination";
import { useCars } from "../services/hooks/useCars";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const [page, setPage] = React.useState(1);
  const limit = useBreakpointValue({ sm: 5, md: 6, xl: 10 });
  const { data, isLoading } = useCars(page, limit);

  return (
    <div>
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
    </div>
  );
};

export default Home;
