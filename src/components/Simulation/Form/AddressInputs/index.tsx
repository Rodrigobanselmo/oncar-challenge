import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { cepMask } from "../../../../utils/masks/cep.mask";
import { numberMask } from "../../../../utils/masks/number.mask";
import { InputForm } from "../../../shared/Forms/HookForm/Input";

export function AddressInputs(props: GridProps): JSX.Element {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid templateColumns="1fr 1fr 1fr 1fr 1fr 1fr" gap="8" {...props}>
      <GridItem colSpan={6}>
        <InputForm
          label={"CEP"}
          placeholder="Digite aqui"
          isRequired={true}
          mask={cepMask.onChange}
          error={errors.cep}
          maxW={250}
          {...register("cep")}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <InputForm
          label={"Logradouro"}
          isDisabled={true}
          error={errors.street}
          placeholder="Digite aqui"
          {...register("street")}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <InputForm
          label={"Número"}
          error={errors.number}
          placeholder="Digite aqui"
          mask={numberMask.onChange}
          {...register("number")}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <InputForm
          label={"Complemento"}
          error={errors.complement}
          placeholder="Digite aqui"
          {...register("complement")}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <InputForm
          label={"Bairro"}
          isRequired={true}
          isDisabled={true}
          error={errors.neighborhood}
          placeholder="Digite aqui"
          {...register("neighborhood")}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <InputForm
          label={"Cidade"}
          isDisabled={true}
          error={errors.city}
          placeholder="Digite aqui"
          {...register("city")}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <InputForm
          label={"Estado"}
          isDisabled={true}
          error={errors.estate}
          placeholder="Digite aqui"
          {...register("estate")}
        />
      </GridItem>
    </Grid>
  );
}
