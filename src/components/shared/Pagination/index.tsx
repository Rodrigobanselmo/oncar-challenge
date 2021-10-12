import { useMemo } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

import { PaginationItem } from "./PaginationItem";

import { IPaginationProps } from "./@interfaces";

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  onPageChange,
  totalCountOfRegisters,
  currentPage = 1,
  registersPerPage = 10,
  siblingsCount = 1,
}: IPaginationProps): JSX.Element {
  const lastPage = useMemo(() => {
    return Math.ceil(totalCountOfRegisters / registersPerPage);
  }, [registersPerPage, totalCountOfRegisters]);

  const previousPage = useMemo(() => {
    return currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];
  }, [currentPage, siblingsCount]);

  const nextPages = useMemo(() => {
    return currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];
  }, [currentPage, lastPage, siblingsCount]);

  // prop drilling

  return (
    <Stack
      direction={["column", "column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{(currentPage - 1) * registersPerPage}</strong> -{" "}
        <strong>{currentPage * registersPerPage}</strong> de{" "}
        <strong>{totalCountOfRegisters}</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem pageNumber={1} onPageChange={onPageChange} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((page) => {
            return (
              <PaginationItem
                key={page}
                pageNumber={page}
                onPageChange={onPageChange}
              />
            );
          })}

        <PaginationItem
          pageNumber={currentPage}
          onPageChange={onPageChange}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                key={page}
                pageNumber={page}
                onPageChange={onPageChange}
              />
            );
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem pageNumber={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}