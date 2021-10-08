import { Box, Flex, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { NAV_ITEMS } from "../../../../constants/nav-items.constants";

export const DesktopNav = () => {
  const router = useRouter();

  const linkColor = useColorModeValue("text.400", "gray.200");
  const linkActiveColor = useColorModeValue("text.500", "gray.100");
  const linkHoverColor = useColorModeValue("text.600", "white");

  return (
    <Stack align="center" direction={"row"} spacing={10}>
      {NAV_ITEMS.map((navItem) => {
        const isActive = router.pathname === navItem.href;

        return (
          <Flex h="100%" align="center" position="relative" key={navItem.label}>
            <NextLink href={navItem.href} passHref>
              <Link
                p={2}
                fontSize={"sm"}
                fontWeight={isActive ? 700 : 600}
                color={isActive ? linkActiveColor : linkColor}
                transition={"all 0.3s linear"}
                transform={isActive ? "scale(1.05)" : ""}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                  transform: "scale(1.05)",
                }}
              >
                {navItem.label}
              </Link>
            </NextLink>
            {isActive && (
              <Box
                position={"absolute"}
                bottom={"-2px"}
                width={"90%"}
                right={"5%"}
                bg={"main.700"}
                height={"3px"}
                borderTopLeftRadius={"5px"}
                borderTopRightRadius={"5px"}
              />
            )}
          </Flex>
        );
      })}
    </Stack>
  );
};
