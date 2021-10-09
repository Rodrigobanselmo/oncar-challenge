import { Flex, HStack, Select } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Header } from "../components/shared/Header";
import { useBrandModel } from "../services/hooks/useBrandModel";
import { Model } from "../@types/models";
import { CarFilter } from "../components/shared/Filters/CarFilter";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Oncar</title>
        <meta
          name="description"
          content="financiamento de carros e simulação de crédito"
        />
      </Head>
      <Flex as="main" justify="center" px={["3rem", null, "4rem"]}>
        <CarFilter />
      </Flex>
      <footer></footer>
    </div>
  );
};

export default Home;
