import { BoxProps, Box, useColorModeValue } from "@chakra-ui/react";

interface IProps extends BoxProps {}

export function ScoreSection({ ...rest }: IProps): JSX.Element {
  return (
    <Box
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.800")}
      my={10}
      {...rest}
    >
      ok
    </Box>
  );
}
