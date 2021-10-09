import { Button } from "@chakra-ui/react";

import { IPaginationItemProps } from "./@interfaces";

export function PaginationItem({
  isCurrent = false,
  pageNumber,
  onPageChange,
}: IPaginationItemProps): JSX.Element {
  if (isCurrent) {
    return (
      <Button
        fontSize="large"
        colorScheme="blue"
        disabled
        _disabled={{
          bg: "main.500",
          cursor: "default",
        }}
      >
        {pageNumber}
      </Button>
    );
  }

  return (
    <Button
      fontSize="md"
      minW="10"
      bg="main.100"
      border="1px solid"
      borderColor="gray.300"
      _hover={{
        bg: "main.200",
      }}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </Button>
  );
}
