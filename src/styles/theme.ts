import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export const themeModel = {
  colors: {
    sidebar: "#1A202C",
    bg: {
      light: "gray.50",
      dark: "gray.800",
    },
    main: {
      800: "#155993",
      700: "#196db5",
      600: "#1e86dd",
      500: "#0488f0",
      400: "#56a0e2",
      300: "#5bbfff",
      200: "#96aabf",
    },
    secondary: {
      900: "#141b2b",
      800: "#15192b",
      600: "#162031",
      500: "#5d6170",
      400: "#747484",
      300: "#696d7a",
      200: "#a0a6ab",
      100: "#f4f7f7",
      50: "#f5f7f7",
    },
    gray: {
      0: "#ffffff",
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("gray.50", "gray.700")(props),
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      },
    }),
  },
};

export const theme = extendTheme(themeModel, { config });
