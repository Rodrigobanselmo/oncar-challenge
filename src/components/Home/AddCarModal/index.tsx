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
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

import { CarFormData } from "./@interfaces";
import { carSchema } from "./@schemas/car.schema";
import { CarInputs } from "./CarInputs";

interface IProps {
  // setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  // children: React.ReactNode;
}

export function AddCarModal({}: IProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleCreateCar: SubmitHandler<CarFormData> = (values) => {
    onCloseModal();
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
