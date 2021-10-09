import { Select, SelectProps, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ISelectProps extends SelectProps {
  children: ReactNode;
}

export function SelectChakra({ children, ...res }: ISelectProps): JSX.Element {
  return (
    <Select
      minW={"10rem"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={useColorModeValue(
        "0 0.05rem 0.15rem 0 rgba(0, 0, 0, 0.15);",
        "0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.35);"
      )}
      {...res}
    >
      {children}
    </Select>
  );
}
