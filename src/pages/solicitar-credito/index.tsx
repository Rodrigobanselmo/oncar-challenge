import Head from "next/head";

import { PageContainer } from "../../components/shared/Container/Page";
import { MainSimulation } from "../../components/Simulation";

import type { NextPage } from "next";
const Simulation: NextPage = () => {
  return (
    <PageContainer id={"simulation_page"}>
      <Head>
        <title>Oncar</title>
        <meta name="description" content="simulação de crédito" />
      </Head>
      <MainSimulation />
      <footer></footer>
    </PageContainer>
  );
};

export default Simulation;
