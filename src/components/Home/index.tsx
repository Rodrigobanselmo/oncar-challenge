import { Heading, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { animateScroll as scroll } from "react-scroll";

import { Pagination } from "../../components/shared/Pagination";
import { useCars } from "../../services/hooks/Queries/useCars";
import { IFilters } from "../../services/hooks/Queries/useCars/@interfaces";
import { MainContainer } from "../shared/Container/Main";
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
    <MainContainer>
      <Heading textAlign="center" mb={6}>
        BUSQUE AGORA SEU CARRO
      </Heading>
      <CarFilter setFilters={setFilters} />

      <CarTable data={data} isLoading={isLoading} />

      <Pagination
        onPageChange={handleChangePage}
        totalCountOfRegisters={Number(data?.totalCount) || 0}
        currentPage={page}
        registersPerPage={10}
        siblingsCount={3}
      />
    </MainContainer>
  );
}
