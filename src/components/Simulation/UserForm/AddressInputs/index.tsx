import { Box, Grid, GridItem, GridProps } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { useBrasilCep } from "../../../../services/hooks/Mutations/useBrasilCep";
import { cepMask } from "../../../../utils/masks/cep.mask";
import { numberMask } from "../../../../utils/masks/number.mask";
import { InputForm } from "../../../shared/Forms/HookForm/Input";

export function AddressInputs(props: GridProps): JSX.Element {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const ref = useRef<HTMLDivElement | null>(null);

  const getCep = useBrasilCep();

  const onGetApiCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 7 && value.replace(/[ˆ\D ]/g, "").length > 7) {
      if (ref.current) ref.current.style.display = "flex";
      const address = await getCep.mutateAsync(value);
      if (ref.current) ref.current.style.display = "none";
      return Object.entries(address).map(([key, value]) => {
        setValue(`address.${key}`, value);
      });
    }
  };

  return (
    <Grid
      templateColumns={[
        "1fr 1fr",
        "1fr 1fr 1fr 1fr",
        "1fr 1fr 1fr 1fr 1fr 1fr",
      ]}
      gap="8"
      {...props}
    >
      <GridItem colSpan={[2, 4, 6]}>
        <Box maxW={250} position="relative">
          <InputForm
            label={"CEP"}
            placeholder="Digite aqui"
            isRequired={true}
            mask={cepMask.onChange}
            error={errors.address && errors.address?.cep}
            onChangeValue={onGetApiCep}
            {...register("address.cep")}
          />
          <Spinner
            id={"spinner_cep"}
            ref={ref}
            position="absolute"
            display="none"
            bottom={4}
            right={2}
            size="sm"
            mt={2}
            mr={2}
            color="green.500"
            speed="0.65s"
          />
        </Box>
      </GridItem>
      <GridItem colSpan={[2, 4, 2]}>
        <InputForm
          label={"Logradouro"}
          isDisabled={true}
          error={errors.address && errors.address.street}
          placeholder="Digite aqui"
          {...register("address.street")}
        />
      </GridItem>
      <GridItem colSpan={[1, 2, 1]}>
        <InputForm
          label={"Número"}
          error={errors.address && errors.address.number}
          isRequired={true}
          placeholder="Digite aqui"
          mask={numberMask.onChange}
          {...register("address.number")}
        />
      </GridItem>
      <GridItem colSpan={[1, 2, 1]}>
        <InputForm
          label={"Complemento"}
          error={errors.address && errors.address.complement}
          placeholder="Digite aqui"
          {...register("address.complement")}
        />
      </GridItem>
      <GridItem colSpan={[2, 4, 2]}>
        <InputForm
          label={"Bairro"}
          isRequired={true}
          isDisabled={true}
          error={errors.address && errors.address.neighborhood}
          placeholder="Digite aqui"
          {...register("address.neighborhood")}
        />
      </GridItem>
      <GridItem colSpan={[2, 2, 4]}>
        <InputForm
          label={"Cidade"}
          isDisabled={true}
          error={errors.address && errors.address.city}
          placeholder="Digite aqui"
          {...register("address.city")}
        />
      </GridItem>
      <GridItem colSpan={[1, 2]}>
        <InputForm
          label={"Estado"}
          isDisabled={true}
          error={errors.address && errors.address.state}
          placeholder="Digite aqui"
          {...register("address.state")}
        />
      </GridItem>
    </Grid>
  );
}
