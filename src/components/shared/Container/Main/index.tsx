import { BoxProps, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IContainerProps extends BoxProps {
  children: ReactNode;
}

export function MainContainer({
  children,
  ...res
}: IContainerProps): JSX.Element {
  return (
    <Box
      as="main"
      maxW={"container.xl"}
      m="auto"
      mb={20}
      px={["3rem", null, "4rem"]}
      pt={10}
      {...res}
    >
      {children}
    </Box>
  );
}
