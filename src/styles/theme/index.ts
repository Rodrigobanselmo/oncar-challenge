import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import { colors } from "./colors";
import { styles } from "./global";
import { Button } from "./components/button";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const themeModel = {
  colors,
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles,
  components: {
    Button,
  },
};

export const theme = extendTheme(themeModel, { config });
