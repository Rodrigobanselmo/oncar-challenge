import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useController } from "react-hook-form";

import { IRadioGroupProps } from "./@interfaces";

export const ChakraRadioGroup: FC<IRadioGroupProps> = ({
  control,
  name,
  label,
  isRequired,
  options,
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
      <FormLabel>{label}</FormLabel>
      <HStack {...group} {...rest}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <Radio key={value} {...radio} {...ratioProps}>
              {value}
            </Radio>
          );
        })}
      </HStack>
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};
