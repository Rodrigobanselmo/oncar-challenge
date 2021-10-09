import { Grid, GridItem, Select } from "@chakra-ui/react";
import { ChangeEvent, useMemo, useState } from "react";

import { Model } from "../../../../@types/models";
import { PRICES } from "../../../../constants/prices.constants";
import { useBrandModel } from "../../../../services/hooks/useBrandModel";

export function CarFilter(): JSX.Element {
  const { data, isLoading } = useBrandModel();

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedLowerPrice, setSelectedLowerPrice] = useState("");
  const [selectedHigherPrice, setSelectedHigherPrice] = useState("");

  function handleSelectBrand(event: ChangeEvent<HTMLSelectElement>) {
    const brandName = event.target.value;
    setSelectedBrand(brandName);
  }

  function handleSelectModel(event: ChangeEvent<HTMLSelectElement>) {
    const modelName = event.target.value;
    setSelectedModel(modelName);
  }

  function handleSelectPriceL(event: ChangeEvent<HTMLSelectElement>) {
    const price = event.target.value;
    if (Number(selectedHigherPrice) <= Number(price))
      setSelectedHigherPrice("");
    setSelectedLowerPrice(price);
  }

  function handleSelectPriceH(event: ChangeEvent<HTMLSelectElement>) {
    const price = event.target.value;
    console.log(`price`, selectedLowerPrice, price);
    if (Number(selectedLowerPrice) >= Number(price)) setSelectedLowerPrice("");
    setSelectedHigherPrice(price);
  }

  const onFilterModels = () => {
    if (!data || (data && !data?.models)) return [];
    if (!selectedBrand) return data.models;
    return data.models.filter((model) => model.brandName === selectedBrand);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const models = useMemo(() => onFilterModels(), [selectedBrand]);
  const brands = (data && data?.brands) || [];

  return (
    <Grid
      templateColumns={["repeat(2, 1fr)", null, null, "repeat(4, 1fr)"]}
      gap={["20px", "30px", "40px"]}
      maxW={"container.xl"}
      align="center"
    >
      <GridItem colSpan={[2, null, 1, 1]}>
        <Select
          value={selectedBrand}
          onChange={handleSelectBrand}
          minW={"10rem"}
          placeholder={isLoading ? "carregando..." : "Marca"}
        >
          {brands.map((brand) => (
            <option key={brand.name} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </Select>
      </GridItem>
      <GridItem colSpan={[2, null, 1, 1]}>
        <Select
          value={selectedModel}
          minW={"10rem"}
          onChange={handleSelectModel}
          placeholder={isLoading ? "carregando..." : "Modelo"}
        >
          {models.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </Select>
      </GridItem>
      <GridItem colSpan={1}>
        <Select
          value={selectedLowerPrice}
          minW={"10rem"}
          onChange={handleSelectPriceL}
          placeholder={isLoading ? "carregando..." : "De:"}
        >
          {PRICES.map((price) => (
            <option key={price} value={price}>
              {price}.000 R$
            </option>
          ))}
        </Select>
      </GridItem>
      <GridItem colSpan={1}>
        <Select
          value={selectedHigherPrice}
          minW={"10rem"}
          onChange={handleSelectPriceH}
          placeholder={isLoading ? "carregando..." : "Áte:"}
        >
          {PRICES.map((price) => (
            <option key={price} value={price}>
              {price}.000 R$
            </option>
          ))}
        </Select>
      </GridItem>
    </Grid>
  );
}
