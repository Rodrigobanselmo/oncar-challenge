import { Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { animateScroll as scroll } from "react-scroll";

import { ValueFormData } from "./@interfaces";
import { valueSchema } from "./@schemas/values.schema";
import { ValueInputs } from "./ValueInputs";

interface IProps {
  onOpenForm: () => void;
  onCloseForm: () => void;
}

export function ValueForm({ onOpenForm, onCloseForm }: IProps): JSX.Element {
  const form = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        ...valueSchema,
      })
    ),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const screenOffset = useBreakpointValue({ base: 620, md: 300 });

  const handleUserSimulation: SubmitHandler<ValueFormData> = (values) => {
    onOpenForm();
    scroll.scrollTo(screenOffset || 300, {
      duration: 800,
      smooth: true,
      containerId: "simulation_page",
      delay: 700,
    });
  };

  return (
    <FormProvider {...form}>
      <Flex
        as="form"
        w="100%"
        flexDir="column"
        mt={16}
        onSubmit={handleSubmit(handleUserSimulation)}
      >
        <ValueInputs />
        <Button
          type="submit"
          mt={10}
          mr="auto"
          minW={200}
          size="md"
          variant={"main"}
          isLoading={isSubmitting}
        >
          Avaliar Crédito
        </Button>
      </Flex>
    </FormProvider>
  );
}
