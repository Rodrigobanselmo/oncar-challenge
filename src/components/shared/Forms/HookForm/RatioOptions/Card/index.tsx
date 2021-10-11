import React, { FC } from "react";
import { useRadio, Box } from "@chakra-ui/react";

export const RadioCard: FC<any> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "main.700",
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        _active={{
          bg: "main.800",
        }}
        _hover={{
          filter: "brightness(0.8)",
        }}
        py={2}
        px={5}
      >
        {props.displayValue}
      </Box>
    </Box>
  );
};
