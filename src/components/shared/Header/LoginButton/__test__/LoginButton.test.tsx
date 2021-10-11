import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

import { LoginNav } from "..";
import { AuthProvider } from "../../../../../context/AuthContext";
import { theme } from "../../../../../styles/theme";
import { BroadcastChannel } from "broadcast-channel";

const MockLoginNav = () => {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <LoginNav />
      </ChakraProvider>
    </AuthProvider>
  );
};

describe("LoginButton Component", () => {
  beforeEach(() => {});

  it("renders correctly", () => {
    render(<MockLoginNav />);

    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });
  // it("should change light mode to dark mode when clicked", () => {
  //   render(<MockDarkModeSwitch />);
  //   const darkModeSwitch = screen.getByTestId("dark_mode_switch_light");
  //   fireEvent.click(darkModeSwitch);

  //   expect(screen.getByTestId("dark_mode_switch_dark")).toBeInTheDocument();
  // });
});
