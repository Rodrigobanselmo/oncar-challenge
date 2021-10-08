import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";

import { DarkModeSwitch } from "./DarkModeSwitch";
import { DesktopNav } from "./DesktopNav";
import { LoginNav } from "./LoginButton";
import { LogoNav } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header(): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        boxShadow="0px 0px 5px 2px rgba(0,0,0,0.1)"
        h={"4rem"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        bg={useColorModeValue("white", "gray.800")}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          position={{ base: "absolute", md: "inherit" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex flex={{ base: 1 }} ml={{ base: 8, md: 0 }}>
          <LogoNav />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <DarkModeSwitch />
        <LoginNav />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav onToggle={onToggle} />
      </Collapse>
    </Box>
  );
}
