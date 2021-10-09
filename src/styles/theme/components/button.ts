import { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const Button: ComponentStyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    fontWeight: "600",
  }),
  variants: {
    main: (props: StyleFunctionProps) => ({
      fontWeight: "bold",
      color: "whiteAlpha.900",
      bg: "main.500",
      _hover: {
        bg: "main.600",
      },
      _active: {
        bg: "main.700",
      },
    }),
  },
};
