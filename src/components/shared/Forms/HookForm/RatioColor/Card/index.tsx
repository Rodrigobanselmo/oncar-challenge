import React, { FC } from "react";
import { useRadio, Box } from "@chakra-ui/react";

export const RadioCardColor: FC<any> = (props) => {
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
        opacity="0.8"
        bg={props.color}
        _checked={{
          w: 10,
          opacity: 1,
          h: 10,
        }}
        _focus={{
          boxShadow: "outline",
        }}
        w={7}
        h={7}
      />
    </Box>
  );
};
