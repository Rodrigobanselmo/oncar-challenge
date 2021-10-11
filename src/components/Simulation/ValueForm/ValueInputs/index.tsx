import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { cpfMask } from "../../../../utils/masks/cpf.mask";
import { currencyMask } from "../../../../utils/masks/currency.mask";
import { dateMask } from "../../../../utils/masks/date.mask";
import { phoneMask } from "../../../../utils/masks/phone.mask";
import { InputForm } from "../../../shared/Forms/HookForm/Input";

interface IProps {
  register: any;
  errors: any;
}

export function ValueInputs(props: GridProps): JSX.Element {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap="8" {...props}>
      <GridItem colSpan={1}>
        <InputForm
          label={"Valor do veículo:"}
          placeholder="Digite aqui..."
          mask={currencyMask.onChange}
          error={errors.carPrice}
          {...register("carPrice")}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <InputForm
          label={"Digite o valor da Entrada:"}
          placeholder="Valor pretendido de entrada"
          mask={currencyMask.onChange}
          error={errors.initPayment}
          {...register("initPayment")}
        />
      </GridItem>
    </Grid>
  );
}
