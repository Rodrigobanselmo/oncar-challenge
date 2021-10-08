import { Flex, Select } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Header } from "../components/shared/Header";

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
      <main>
        <Flex>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Flex>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
