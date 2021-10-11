import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "node:querystring";
import { Car } from "../../@types/cars";
import { MainCar } from "../../components/Cars";

import { PageContainer } from "../../components/shared/Container/Page";
import { MainSimulation } from "../../components/Simulation";
import api from "../../services/api";

export default function Simulation({ car }: { car: Car }) {
  return (
    <PageContainer id={"simulation_page"}>
      <Head>
        <title>Oncar</title>
        <meta name="description" content="simulação de crédito" />
      </Head>
      <MainCar car={car} />
      <footer></footer>
    </PageContainer>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams;

  const response = await api.get<Car>(`cars/${id}`);

  const car = response.data;

  return {
    props: {
      car,
    },
    revalidate: 60 * 60 * 24 * 10, // 10 days
  };
};
