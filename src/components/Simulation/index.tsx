import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

import { MainContainer } from "../shared/Container/Main";
import { Divider } from "../shared/Forms/Divider";
import { ChakraRadioGroup } from "../shared/Forms/HookForm/Ratio";
import { aboutUserSchema } from "./Form/@schemas/aboutUser.schema";
import { addressSchema } from "./Form/@schemas/address.schema";
import { incomeSchema } from "./Form/@schemas/income.schema";
import { AboutUserInputs } from "./Form/AboutUserInputs";
import { AddressInputs } from "./Form/AddressInputs";
import { MoreInfoInputs } from "./Form/MoreInfoInputs";

type SimulationFormData = {
  name: string;
  cpf: string;
};

export function MainSimulation(): JSX.Element {
  // const [page, setPage] = React.useState(1);
  // const limit = useBreakpointValue({ sm: 5, md: 6, xl: 10 });
  // const { data, isLoading } = useCars(page, limit, filters);

  // const handleChangePage = (page: number) => {
  //   scroll.scrollTo(0, {
  //     duration: 800,
  //     smooth: true,
  //     containerId: "home_page",
  //   });
  //   setPage(page);
  // };

  const form = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        ...aboutUserSchema,
        ...addressSchema,
        ...incomeSchema,
      })
    ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const handleSignIn: SubmitHandler<SimulationFormData> = (values) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <MainContainer>
        <Heading textAlign="center" mb={1}>
          QUERO AVALIAR MEU CRÉDITO
        </Heading>
        <Text as="h2" fontSize="xl" textAlign="center" mb={6}>
          Aqui na Oncar, facilitamos a sua aprovação, mesmo com restrição no
          nome.
        </Text>
        <Flex
          as="form"
          w="100%"
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <AboutUserInputs />
          <Divider mx={100} />
          <AddressInputs />
          <Divider mx={100} />
          <MoreInfoInputs />
          <Button
            type="submit"
            mt={10}
            ml="auto"
            minW={200}
            size="lg"
            colorScheme={"red"}
            variant={"solid"}
            isLoading={isSubmitting}
          >
            Avaliar Crédito
          </Button>
        </Flex>
      </MainContainer>
    </FormProvider>
  );
}
