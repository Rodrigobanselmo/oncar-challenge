import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useCreateCar } from "../../../services/hooks/Mutations/useCreateCar";
import { queryClient } from "../../../services/queryClient";
import { GetModelBrandResponse } from "../../../services/hooks/Queries/useBrandModel/@interfaces";

import { CarFormData } from "./@interfaces";
import { carSchema } from "./@schemas/car.schema";
import { CarInputs } from "./CarInputs";
import { Brand } from "../../../@types/brands";
import { Model } from "../../../@types/models";

interface IProps {
  // setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  // children: React.ReactNode;
}

export function AddCarModal({}: IProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const setCar = useCreateCar();

  const form = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        ...carSchema,
      })
    ),
  });

  const initialRef = useRef<HTMLInputElement>(null);
  console.log(`reload`);

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onCloseModal = () => {
    reset();
    onClose();
  };

  const handleCreateCar: SubmitHandler<CarFormData> = async (values) => {
    const car = await setCar.mutateAsync(values);
    if (car?.id) {
      onCloseModal();
      queryClient.setQueryData(
        "brand-model",
        (oldData: GetModelBrandResponse | any) => ({
          brands: [
            ...oldData.brands.filter((i: Brand) => i.name !== car.brandName),
            { name: car.brandName, created_at: new Date() },
          ],
          models: [
            ...oldData.models.filter((i: Model) => i.name !== car.modelName),
            { name: car.modelName, created_at: new Date() },
          ],
        })
      );
      toast({
        title: "Carro adicionado com sucesso",
        status: "success",
        duration: 3000,
        position: "top-right",
      });
    }
    console.log(`values`, values);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size={"md"}
        w={["100%", "100%", 200]}
        variant={"main"}
      >
        ADICIONAR
      </Button>
      <FormProvider {...form}>
        <Modal
          size={"xl"}
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onCloseModal}
        >
          <ModalOverlay bg="#00000095" />
          <ModalContent
            minW={["auto", 500, 700, 900]}
            as="form"
            onSubmit={handleSubmit(handleCreateCar)}
            mx={5}
          >
            <ModalHeader>Adicionar Novo Veículo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <CarInputs />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button isLoading={isSubmitting} type="submit" colorScheme="blue">
                Criar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </FormProvider>
    </>
  );
}
