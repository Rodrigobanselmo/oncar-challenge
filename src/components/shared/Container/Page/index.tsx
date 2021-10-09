import { BoxProps, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

import { ContainerStyled } from "./styled";

interface IContainerProps extends BoxProps {
  children: ReactNode;
}

export function PageContainer({
  children,
  ...res
}: IContainerProps): JSX.Element {
  const isDarkMode = useColorModeValue(0, 1);
  return (
    <ContainerStyled
      is_dark_mode={isDarkMode}
      h={"100vh"}
      w={"100vw"}
      overflow="auto"
      pb={10}
      {...res}
    >
      {children}
    </ContainerStyled>
  );
}
