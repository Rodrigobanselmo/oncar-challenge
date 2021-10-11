import { Heading } from "@chakra-ui/react";
import React from "react";

import { Car } from "../../@types/cars";
import { MainContainer } from "../shared/Container/Main";

export function MainCar({ car }: { car: Car }): JSX.Element {
  return (
    <MainContainer>
      <Heading textAlign="center" mb={6}>
        BUSQUE AGORA SEU CARRO
      </Heading>
    </MainContainer>
  );
}
