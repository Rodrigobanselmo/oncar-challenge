import { BoxProps, Box, useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";

interface IProps extends BoxProps {
  score: {
    value: number;
    message: string;
  };
}

export function ScoreSection({ score, ...rest }: IProps): JSX.Element {
  return (
    <Box
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.800")}
      my={10}
      {...rest}
    >
      {score.value}
      {score.message}
    </Box>
  );
}
