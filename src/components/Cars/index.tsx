import { CalendarIcon } from "@chakra-ui/icons";
import {
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaGasPump } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";

import { Car } from "../../@types/cars";
import { MainContainer } from "../shared/Container/Main";
import { ChakraNextImage } from "../shared/NextImage";

export function MainCar({ car }: { car: Car }): JSX.Element {
  return (
    <MainContainer>
      <Heading textAlign="center" mb={6}>
        Pagina Estática
      </Heading>
      <Grid
        boxShadow={useColorModeValue(
          "0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.25);",
          "0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.35);"
        )}
        bg={useColorModeValue("gray.100", "gray.800")}
        templateColumns={{ md: "5fr 5fr" }}
        gap={{ md: 5 }}
        borderRadius={40}
        p={4}
      >
        <GridItem>
          <ChakraNextImage
            alt="Car"
            borderRadius={20}
            overflow="hidden"
            h={"100%"}
            maxH={["300px", "310px"]}
            minH={"500px"}
            src={
              "https://i.pinimg.com/originals/78/14/08/7814085de219291c58ef6d637795d58e.jpg"
            }
          />
          {/* <Icon as={IoIosCar} boxSize={200} bg="main.700" /> */}
        </GridItem>
        <GridItem p={2}>
          <Text fontSize={"30"} mt={[1, 1, -2]} mb={-1}>
            <strong>{car.brandName}</strong>
          </Text>
          <Text fontSize={"25"}>{car.modelName}</Text>
          <Text fontSize={"sm"} mt={2}>
            À vista
          </Text>
          <Text
            color={"main.700"}
            fontWeight={"bold"}
            fontSize={"2xl"}
            mb={[3, 4, 12, 12, 3]}
          >
            {car.price}
          </Text>
          <SimpleGrid columns={[2, 3, 3, 3, 1]}>
            <HStack>
              <CalendarIcon boxSize={3} />
              <Text>{car.year}</Text>
            </HStack>
            <HStack display={["none", "flex"]}>
              <Icon as={FaGasPump} boxSize={3} />
              <Text>{car.fuel}</Text>
            </HStack>
            <HStack>
              <Icon as={IoIosSpeedometer} boxSize={3} />
              <Text>{car.kilometers}</Text>
            </HStack>
          </SimpleGrid>
        </GridItem>
        {car?.desc && (
          <GridItem colSpan={[2]}>
            <Text mt={-2}>
              <strong>Opcionais:</strong> {car.desc}
            </Text>
          </GridItem>
        )}
      </Grid>
    </MainContainer>
  );
}
