import { Flex, Link, Box, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

import { INavMobileItem } from "../../@interfaces";

export const MobileNavItem = ({
  label,
  href,
  isActive,
  onToggle,
}: INavMobileItem) => {
  return (
    <NextLink href={href} passHref>
      <Flex
        py={2}
        onClick={onToggle}
        position="relative"
        as={Link}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          px={5}
          fontWeight={600}
          fontSize={"sm"}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {isActive && (
          <Box
            position={"absolute"}
            h={"100%"}
            w="3px"
            bg={"main.700"}
            borderTopRightRadius={"5px"}
            borderBottomRightRadius={"5px"}
          />
        )}
      </Flex>
    </NextLink>
  );
};
