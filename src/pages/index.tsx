import Head from "next/head";
import React from "react";

import { MainHome } from "../components/Home";
import { PageContainer } from "../components/shared/Container";

import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <PageContainer id={"home_page"}>
      <Head>
        <title>Oncar</title>
        <meta name="description" content="financiamento de carros" />
      </Head>
      <MainHome />
      <footer></footer>
    </PageContainer>
  );
};

export default Home;
