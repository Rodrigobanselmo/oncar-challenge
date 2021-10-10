import { BoxProps, Box, useColorModeValue } from "@chakra-ui/react";

export function Divider(props: BoxProps): JSX.Element {
  return (
    <Box
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.800")}
      my={10}
      {...props}
    />
  );
}
