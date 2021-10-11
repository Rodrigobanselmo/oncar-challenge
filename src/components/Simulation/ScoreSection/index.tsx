import { BoxProps, Box, useColorModeValue, Text } from "@chakra-ui/react";
import { useMemo } from "react";

interface IProps extends BoxProps {
  score: {
    value: number;
    message: string;
  };
}

export function ScoreSection({ score, ...rest }: IProps): JSX.Element {
  function getValue() {
    if (score.value <= 299) return { color: "red.500", init: 1 };
    if (score.value <= 599) return { color: "orange.700", init: 0.7 };
    if (score.value <= 799) return { color: "orange.500", init: 0.5 };
    if (score.value <= 950) return { color: "yellow.500", init: 0.3 };
    if (score.value <= 999) return { color: "green.500", init: 0 };
  }

  const range = useMemo(() => getValue(), [score]);

  return (
    <Box
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.800")}
      my={10}
      p={30}
      borderRadius={20}
      bgGradient={useColorModeValue(
        "linear(to-b, gray.100, gray.300)",
        "linear(to-b, gray.700, gray.800)"
      )}
      {...rest}
    >
      <Text fontSize="18">Seu Score:</Text>
      <Text fontSize="40" fontWeight="bold" color={range?.color}>
        {score.value}
      </Text>
      <Text fontSize="18">{score.message}</Text>
    </Box>
  );
}
