import { ChakraProvider } from "@chakra-ui/react";
import { render, screen, fireEvent } from "@testing-library/react";

import { LoginNav } from "..";
import { AuthProvider } from "../../../../../context/AuthContext";
import { theme } from "../../../../../styles/theme";

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

  it("should be able to authenticate user when clicked", () => {
    render(<MockLoginNav />);
    const lockIcon = screen.getByTestId("lock_icon");
    fireEvent.click(lockIcon);

    expect(screen.getByTestId("unlock_icon")).toBeInTheDocument();
  });
});
