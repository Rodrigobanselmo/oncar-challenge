import { Box, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { animateScroll as scroll } from "react-scroll";

import { Pagination } from "../../components/shared/Pagination";
import { useCars } from "../../services/hooks/Queries/useCars";
import { IFilters } from "../../services/hooks/Queries/useCars/@interfaces";
import { CarFilter } from "./CarFilter";
import { CarTable } from "./CarTable";

export function MainHome(): JSX.Element {
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState<IFilters>({});
  const limit = useBreakpointValue({ sm: 5, md: 6, xl: 10 });
  const { data, isLoading } = useCars(page, limit, filters);

  const handleChangePage = (page: number) => {
    scroll.scrollTo(0, {
      duration: 800,
      smooth: true,
      containerId: "home_page",
    });
    setPage(page);
  };

  return (
    <Box
      as="main"
      maxW={"container.xl"}
      m="auto"
      mb={20}
      px={["3rem", null, "4rem"]}
      pt={20}
    >
      <CarFilter setFilters={setFilters} />

      <CarTable data={data} isLoading={isLoading} />

      <Pagination
        onPageChange={handleChangePage}
        totalCountOfRegisters={Number(data?.totalCount) || 0}
        currentPage={page}
        registersPerPage={10}
        siblingsCount={3}
      />
    </Box>
  );
}
