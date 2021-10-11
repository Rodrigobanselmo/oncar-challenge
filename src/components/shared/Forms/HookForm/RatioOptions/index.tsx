import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useController } from "react-hook-form";

import { IRadioGroupProps } from "./@interfaces";
import { RadioCard } from "./Card";

export const RadioOptions: FC<IRadioGroupProps> = ({
  control,
  name,
  label,
  options,
  isRequired,
  ratioProps,
  ...rest
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange: field.onChange,
    value: field.value,
  });

  const group = getRootProps();

  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]} mb={6}>
      <FormLabel htmlFor={`radio_${name}`} id={`radio_label_${name}`}>
        {label}
      </FormLabel>
      <HStack py={4} my={-4} overflowX="auto" {...group} {...rest}>
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const displayValue =
            typeof option === "string" ? option : option.displayValue;
          const radio = getRadioProps({ value });
          return (
            <RadioCard
              displayValue={displayValue}
              id={`radio_${name}`}
              key={value}
              {...radio}
              {...ratioProps}
            />
          );
        })}
      </HStack>
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};
