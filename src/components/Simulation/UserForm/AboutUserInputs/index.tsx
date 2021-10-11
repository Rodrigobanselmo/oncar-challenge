import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { cpfMask } from "../../../../utils/masks/cpf.mask";
import { dateMask } from "../../../../utils/masks/date.mask";
import { phoneMask } from "../../../../utils/masks/phone.mask";
import { InputForm } from "../../../shared/Forms/HookForm/Input";

interface IProps {
  register: any;
  errors: any;
}

export function AboutUserInputs(props: GridProps): JSX.Element {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid
      templateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
      gap="8"
      {...props}
    >
      <GridItem colSpan={[1, 2]}>
        <InputForm
          label={"Nome completo"}
          placeholder="Digite seu nome aqui"
          error={errors.email}
          {...register("name")}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <InputForm
          label={"CPF"}
          isRequired={true}
          error={errors.cpf}
          placeholder="Digite seu CPF aqui"
          mask={cpfMask.onChange}
          {...register("cpf")}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <InputForm
          flex={1}
          label={"Celular (WhatsApp)"}
          error={errors.phone}
          placeholder="(XX) XXXX-XXXX"
          mask={phoneMask.onChange}
          {...register("phone")}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <InputForm
          flex={1}
          label={"Data de nascimento"}
          isRequired={true}
          error={errors.birthDate}
          placeholder="dd/mm/aaaa"
          mask={dateMask.onChange}
          {...register("birthDate")}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <InputForm
          flex={1}
          label={"E-mail"}
          error={errors.email}
          placeholder="Digite seu e-mail aqui"
          {...register("email")}
        />
      </GridItem>
    </Grid>
  );
}
