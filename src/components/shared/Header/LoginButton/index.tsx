import { Button, Stack, useBreakpointValue } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

export function LoginNav(): JSX.Element {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Stack justify={"flex-end"} direction={"row"} spacing={6}>
      {isMobile ? (
        <Button
          as={"a"}
          fontSize={"m"}
          fontWeight={400}
          variant={"link"}
          href={"#"}
        >
          Entrar
        </Button>
      ) : (
        <Button
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"main.500"}
          leftIcon={<LockIcon />}
          href={"#"}
          iconSpacing={"10px"}
          _hover={{
            bg: "main.600",
          }}
          _active={{
            bg: "main.700",
          }}
        >
          Entrar
        </Button>
      )}
    </Stack>
  );
}
