/* eslint-disable react/no-children-prop */
import {
  InputGroup as ChakraInputGroup,
  InputLeftElement,
  InputRightElement,
  InputGroupProps,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface IProps extends InputGroupProps {
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  children?: React.ReactNode;
}

export function InputGroup({
  rightElement,
  leftElement,
  children,
  ...rest
}: IProps) {
  if (rightElement || leftElement) {
    return (
      <ChakraInputGroup {...rest}>
        {leftElement && <InputLeftElement children={leftElement} />}
        {children}
        {rightElement && <InputRightElement children={rightElement} />}
      </ChakraInputGroup>
    );
  } else {
    return <>{children}</>;
  }
}
