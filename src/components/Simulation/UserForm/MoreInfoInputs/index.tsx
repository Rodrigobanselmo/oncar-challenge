import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { cepMask } from "../../../../utils/masks/cep.mask";
import { currencyMask } from "../../../../utils/masks/currency.mask";
import { numberMask } from "../../../../utils/masks/number.mask";
import { InputForm } from "../../../shared/Forms/HookForm/Input";
import { ChakraRadioGroup } from "../../../shared/Forms/HookForm/Ratio";

export function MoreInfoInputs(props: GridProps): JSX.Element {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid
      templateColumns={["1fr ", "1fr 1fr", null, "1.2fr 1fr 1fr"]}
      gap="5"
      {...props}
    >
      <GridItem colSpan={[1, 2, 1]}>
        <InputForm
          w={"80%"}
          label={"Renda mensal aproximada"}
          error={errors.income}
          placeholder="R$"
          mask={currencyMask.onChange}
          {...register("income")}
        />
      </GridItem>
      <GridItem>
        <ChakraRadioGroup
          options={["Sim", "Não"]}
          control={control}
          isRequired={true}
          label={"Alguém vai te ajudar a pagar?"}
          name={"haveHelp"}
        />
      </GridItem>
      <GridItem>
        <ChakraRadioGroup
          options={["Sim", "Não"]}
          control={control}
          isRequired={true}
          label={"Restrição no nome/nome sujo?"}
          name={"dirtyName"}
        />
      </GridItem>
    </Grid>
  );
}
