import "@emotion/react";

import { theme } from "@chakra-ui/react";

import { themeModel } from "../theme";

type CustomTheme = typeof themeModel.colors;
type ChakraTheme = typeof theme.colors;

interface NewTheme extends ChakraTheme {}
interface NewTheme extends CustomTheme {}

declare module "@emotion/react" {
  export interface Theme {
    colors: NewTheme;
  }
}
