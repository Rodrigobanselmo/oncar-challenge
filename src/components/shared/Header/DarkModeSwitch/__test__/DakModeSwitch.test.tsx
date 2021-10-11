import "@testing-library/jest-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { DarkModeSwitch } from "..";
import { queryClient } from "../../../../../services/queryClient";
import { theme } from "../../../../../styles/theme";

const MockDarkModeSwitch = () => {
  return (
    <ChakraProvider theme={theme}>
      <DarkModeSwitch />
    </ChakraProvider>
  );
};
//  </QueryClientProvider>
// <QueryClientProvider client={queryClient}>

describe("DarkMode Component", () => {
  it("renders correctly", () => {
    render(<MockDarkModeSwitch />);

    expect(screen.getByTestId("dark_mode_flex")).toBeInTheDocument();
  });

  it("should start with light mode on", () => {
    render(<MockDarkModeSwitch />);

    expect(screen.getByTestId("dark_mode_switch_light")).toBeInTheDocument();
  });

  it("should change light mode to dark mode when clicked", () => {
    render(<MockDarkModeSwitch />);
    const darkModeSwitch = screen.getByTestId("dark_mode_switch_light");
    fireEvent.click(darkModeSwitch);

    expect(screen.getByTestId("dark_mode_switch_dark")).toBeInTheDocument();
  });
});
