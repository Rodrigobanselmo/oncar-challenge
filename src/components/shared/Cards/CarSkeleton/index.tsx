/* eslint-disable react/jsx-key */
import {
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ChangeEvent, useMemo, useState } from "react";

export function CarSkeleton(): JSX.Element {
  // const { data, isLoading } = useBrandModel();
  // const [selectedBrand, setSelectedBrand] = useState("");
  return (
    <Grid
      gap={{ md: 5 }}
      bg={useColorModeValue("gray.100", "gray.800")}
      templateColumns={{ md: "3fr 5fr" }}
      borderRadius={20}
      p={4}
    >
      <GridItem>
        <Skeleton height={170} borderRadius={20} />
      </GridItem>
      <GridItem p={2}>
        <SkeletonText noOfLines={2} spacing="2" />
        <SkeletonText noOfLines={1} mt={6} w={20} />
        <Skeleton height={5} mt={2} w={60} />

        <SimpleGrid mt={4} gap={1} columns={[3, 3, 3, 3, 1]}>
          {[1, 2, 3].map((i) => (
            <HStack>
              <SkeletonCircle size="4" />
              <Skeleton height={1} w={30} />
            </HStack>
          ))}
        </SimpleGrid>
      </GridItem>
      {/* <GridItem colSpan={[2]}>
        <SkeletonText spacing="4" noOfLines={2} />
      </GridItem> */}
    </Grid>
  );
}
