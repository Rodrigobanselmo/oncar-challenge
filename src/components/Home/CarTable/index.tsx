import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { CarCard } from "../Cards/Car";
import { CarSkeleton } from "../Cards/CarSkeleton";
import { GetCarsResponse } from "../../../services/hooks/Queries/useCars/@interfaces";

interface IProps {
  data: GetCarsResponse | undefined;
  isLoading: boolean;
}

export function CarTable({ data, isLoading }: IProps): JSX.Element {
  return (
    <SimpleGrid pt={20} columns={[1, 1, 1, 1, 2]} gap={"20px 15px"}>
      {data && data.cars.map((car) => <CarCard key={car.id} car={car} />)}
      {isLoading &&
        Array.from(Array(10).keys()).map((i) => {
          return <CarSkeleton key={i} />;
        })}
    </SimpleGrid>
  );
}
