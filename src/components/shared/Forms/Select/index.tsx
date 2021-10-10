import {
  Select,
  SelectProps,
  FormControl,
  useColorModeValue,
  FormLabel,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ISelectProps extends SelectProps {
  children: ReactNode;
  label: string;
}

export function SelectChakra({
  label,
  children,
  ...res
}: ISelectProps): JSX.Element {
  return (
    <FormControl id={`select_${label}`}>
      <FormLabel>{label}</FormLabel>
      <Select
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={useColorModeValue(
          "0 0.05rem 0.15rem 0 rgba(0, 0, 0, 0.15);",
          "0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.35);"
        )}
        {...res}
      >
        {children}
      </Select>
    </FormControl>
  );
}
