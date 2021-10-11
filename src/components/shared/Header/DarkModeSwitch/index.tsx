import { Flex, FormControl, Switch, useColorMode } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { DarkModeSwitch as DarkMode } from "react-toggle-dark-mode";

export function DarkModeSwitch(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <Flex data-testid={`dark_mode_flex`} mr={["1rem", "2rem", "3rem"]}>
      <FormControl display={{ base: "none", md: "flex" }} alignItems="center">
        <Switch
          data-testid={`dark_mode_switch_${colorMode}`}
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
        />
      </FormControl>
      <DarkMode
        style={{ marginTop: -3 }}
        sunColor={theme.colors.gray[500]}
        checked={colorMode === "dark"}
        onChange={toggleColorMode}
        size={25}
      />
    </Flex>
  );
}
