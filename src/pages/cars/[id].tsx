import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "node:querystring";

import { Car } from "../../@types/cars";
import { MainCar } from "../../components/Cars";
import { PageContainer } from "../../components/shared/Container/Page";
import { FuelOptions } from "../../constants/fuel-options.constants";
import api from "../../services/api";

export default function Simulation({ car }: { car: Car }) {
  return (
    <PageContainer id={"simulation_page"}>
      <Head>
        <title>Oncar</title>
        <meta
          name="description"
          content={`Carro para venda ${car.brandName}, ${car.modelName}`}
        />
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

  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(car.price));
  const op = FuelOptions as any;
  const fuel = op[car.fuel] ?? "...";
  return {
    props: {
      car: { ...car, price, fuel },
    },
    revalidate: 60 * 60 * 24 * 10, // 10 days
  };
};
