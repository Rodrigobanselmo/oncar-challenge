import { Button, Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { animateScroll as scroll } from "react-scroll";
import * as Yup from "yup";

import { useSetSimulation } from "../../../services/hooks/Mutations/useSimulation";
import { Divider } from "../../shared/Forms/Divider";
import { SimulationFormData } from "./@interfaces";
import { aboutUserSchema } from "./@schemas/aboutUser.schema";
import { addressSchema } from "./@schemas/address.schema";
import { incomeSchema } from "./@schemas/income.schema";
import { AboutUserInputs } from "./AboutUserInputs";
import { AddressInputs } from "./AddressInputs";
import { Autofill } from "./Autofill";
import { MoreInfoInputs } from "./MoreInfoInputs";

interface IProps {
  onOpenScore: () => void;
  setScore: React.Dispatch<
    React.SetStateAction<{ value: number; message: string }>
  >;
}

export function UserForm({ onOpenScore, setScore }: IProps): JSX.Element {
  const form = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        ...aboutUserSchema,
        ...addressSchema,
        ...incomeSchema,
      })
    ),
  });

  const setSimulation = useSetSimulation();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleSignIn: SubmitHandler<SimulationFormData> = async (values) => {
    const simulation = await setSimulation.mutateAsync(values);
    if (simulation?.score) {
      setScore({ value: simulation.score, message: simulation.message });
      onOpenScore();
      scroll.scrollTo(0, {
        duration: 800,
        smooth: true,
        containerId: "simulation_page",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <Flex
        as="form"
        w="100%"
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Autofill mb={10} mt={10} />
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
        {/* </Collapse> */}
      </Flex>
    </FormProvider>
  );
}
