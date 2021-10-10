import { forwardRef, ForwardRefRenderFunction, useCallback } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  useColorModeValue,
} from "@chakra-ui/react";

import { IInputProps } from "./@interfaces";

const Input: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { name, label, error = null, isRequired, mask, ...rest },
  ref
): JSX.Element => {
  const alertColor = useColorModeValue("red.500", "red.300");

  const onAppliesMask = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      mask && mask(e);
    },
    [mask]
  );

  const { ...maskOnChange } = mask ? { onChange: onAppliesMask } : {};

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel
          htmlFor={name}
          id={`input_label_${name}`}
          _after={
            isRequired
              ? {
                  content: '"*"',
                  ml: "1px",
                  color: alertColor,
                }
              : {}
          }
        >
          {label}
        </FormLabel>
      )}

      <ChakraInput
        name={name}
        id={`input_${name}`}
        focusBorderColor="main.500"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        bg={useColorModeValue("white", "gray.800")}
        variant="filled"
        _hover={{
          bgColor: useColorModeValue("gray.50", "gray.700"),
        }}
        _placeholder={{
          color: useColorModeValue("gray.500", "gray.400"),
        }}
        _disabled={{
          color: useColorModeValue("gray.500", "gray.400"),
          bgColor: useColorModeValue("gray.200", "gray.700"),
          cursor: "not-allowed",
        }}
        size="lg"
        ref={ref}
        {...rest}
        {...{ ...maskOnChange }}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputForm = forwardRef(Input);
