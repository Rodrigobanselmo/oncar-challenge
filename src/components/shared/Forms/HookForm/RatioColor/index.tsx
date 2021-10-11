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
import { RadioCardColor } from "./Card";

export const RadioColor: FC<IRadioGroupProps> = ({
  control,
  name,
  label,
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
  const options = [
    { color: "white", value: "Branco" },
    { color: "black", value: "Preto" },
    { color: "red.500", value: "Vermelho" },
    { color: "orange.500", value: "Laranja" },
    { color: "blue.500", value: "Azul" },
    { color: "yellow.500", value: "Amarelo" },
    { color: "green.500", value: "Verde" },
    { color: "purple.500", value: "Roxo" },
  ];

  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]} mb={6}>
      <FormLabel htmlFor={`radio_${name}`} id={`radio_label_${name}`}>
        {label}
      </FormLabel>
      <HStack {...group} {...rest}>
        {options.map((option) => {
          const radio = getRadioProps({ value: option.value });
          return (
            <RadioCardColor
              color={option.color}
              id={`radio_${name}`}
              key={option.color}
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
