import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { FuelOptions } from "../../../../constants/fuel-options.constants";
import { GetModelBrandResponse } from "../../../../services/hooks/Queries/useBrandModel/@interfaces";
import { queryClient } from "../../../../services/queryClient";

import { cpfMask } from "../../../../utils/masks/cpf.mask";
import { currencyMask } from "../../../../utils/masks/currency.mask";
import { dateMask } from "../../../../utils/masks/date.mask";
import { kilometersMask } from "../../../../utils/masks/kilometers.mask";
import { numberMask } from "../../../../utils/masks/number.mask";
import { phoneMask } from "../../../../utils/masks/phone.mask";
import { yearMask } from "../../../../utils/masks/year.mask";
import { InputForm } from "../../../shared/Forms/HookForm/Input";
import { RadioColor } from "../../../shared/Forms/HookForm/RatioColor";
import { RadioOptions } from "../../../shared/Forms/HookForm/RatioOptions";
import { SearchInput } from "../../../shared/Forms/HookForm/SearchInput";

interface IProps {
  register: any;
  errors: any;
}

export function CarInputs(props: GridProps): JSX.Element {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const data = queryClient.getQueryData<GetModelBrandResponse | null>(
    "brand-model"
  );

  function transformSearchData(values: Array<{ name: string }>) {
    if (values) {
      return values.map((i) => {
        return i.name;
      });
    }
    return [];
  }

  const memoizedBrand = useMemo(
    () => transformSearchData(data && data?.brands ? data?.brands : []),
    [data]
  );
  const memoizedModels = useMemo(
    () => transformSearchData(data && data?.models ? data?.models : []),
    [data]
  );

  console.log(`reload carInputs`);

  return (
    <Grid
      overflowX="hidden"
      templateColumns={["1fr", null, "1fr 1fr 1fr 1fr"]}
      gap="8"
      {...props}
    >
      <GridItem colSpan={[4, 2]}>
        <InputForm
          maxLength={7}
          label={"Placa:"}
          placeholder="Digite aqui..."
          autoComplete={"off"}
          error={errors.plate}
          {...register("plate")}
        />
      </GridItem>
      <GridItem colSpan={[4, 2]}>
        <RadioColor
          isRequired={true}
          overflowX="auto"
          control={control}
          name={"color"}
          label={"Cor do automovel:"}
        />
      </GridItem>
      <GridItem colSpan={[4, 4, 2]}>
        <SearchInput
          options={memoizedBrand}
          name={"brandName"}
          label={"Marca:"}
          placeholder="Marca do veículo"
        />
      </GridItem>
      <GridItem colSpan={[4, 4, 2]}>
        <SearchInput
          options={memoizedModels}
          name={"modelName"}
          label={"Modelo:"}
          placeholder="Modelo do veículo"
        />
      </GridItem>
      <GridItem colSpan={4}>
        <RadioOptions
          options={Object.entries(FuelOptions).map(([key, value]) => ({
            value: key,
            displayValue: value,
          }))}
          isRequired={true}
          control={control}
          name={"fuel"}
          label={"Combustivel:"}
        />
      </GridItem>
      <GridItem colSpan={[4, 2]}>
        <InputForm
          label={"Valor do veículo:"}
          placeholder="R$"
          mask={currencyMask.onChange}
          autoComplete={"off"}
          error={errors.price}
          {...register("price")}
        />
      </GridItem>
      <GridItem colSpan={[4, 2, 2, 1]}>
        <InputForm
          label={"Ano de fabricação"}
          placeholder="2000/2001"
          autoComplete={"off"}
          mask={yearMask.onChange}
          error={errors.year}
          {...register("year")}
        />
      </GridItem>
      <GridItem colSpan={[4, 4, 4, 1]}>
        <InputForm
          label={"Kilometragem:"}
          placeholder="Digite aqui..."
          autoComplete={"off"}
          mask={kilometersMask.onChange}
          error={errors.kilometers}
          {...register("kilometers")}
        />
      </GridItem>
    </Grid>
  );
}
