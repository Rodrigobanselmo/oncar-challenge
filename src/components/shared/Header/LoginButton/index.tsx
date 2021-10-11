import { Button, Stack, useBreakpointValue } from "@chakra-ui/react";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../../hooks/useAuth";

export function LoginNav(): JSX.Element {
  const { isAuthenticated, signIn, signOut } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Stack justify={"flex-end"} direction={"row"} spacing={6}>
      {isMobile ? (
        <Button
          as={isAuthenticated ? UnlockIcon : "a"}
          onClick={isAuthenticated ? signOut : signIn}
          fontSize={"md"}
          fontWeight={400}
          p={isAuthenticated ? 2 : 0}
          variant={"link"}
          href={"#"}
        >
          Entrar
        </Button>
      ) : (
        <Button
          fontSize={"sm"}
          onClick={isAuthenticated ? signOut : signIn}
          leftIcon={
            isAuthenticated ? (
              <UnlockIcon data-testid={"unlock_icon"} />
            ) : (
              <LockIcon data-testid={"lock_icon"} />
            )
          }
          href={"#"}
          iconSpacing={"10px"}
          variant={"main"}
        >
          Entrar
        </Button>
      )}
    </Stack>
  );
}
