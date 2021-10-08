import { Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export function LogoNav(): JSX.Element {
  return (
    <Link as={NextLink} href="/">
      <Image
        h={{ base: "55px", md: "60px" }}
        transition="transform 0.3s linear"
        _hover={{
          transform: "scale(1.04)",
        }}
        src={"/images/logo.png"}
        objectFit={"contain"}
        alt="Logo"
        cursor="pointer"
      />
    </Link>
  );
}
