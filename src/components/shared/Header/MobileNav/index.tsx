import { Stack, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { NAV_ITEMS } from "../../../../constants/nav-items.constants";
import { MobileNavItem } from "./MobileNavItem";

interface IMobileNavPros {
  onToggle: () => void;
}

export const MobileNav = ({ onToggle }: IMobileNavPros) => {
  const router = useRouter();
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
      _after={{
        content: '""',
        background:
          "-webkit-linear-gradient(top, #00000015 0%, #00000000 100%)",
        display: "block",
        height: "5px",
        width: "100%",
        position: "absolute",
        bottom: 0,
        right: 0,
      }}
    >
      {NAV_ITEMS.map((navItem) => {
        const isActive = router.pathname === navItem.href;
        return (
          <MobileNavItem
            onToggle={onToggle}
            isActive={isActive}
            key={navItem.label}
            {...navItem}
          />
        );
      })}
    </Stack>
  );
};
