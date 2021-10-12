import { Button, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import React, { ChangeEvent, MouseEvent, useMemo, useState } from "react";

import { PRICES } from "../../../constants/prices.constants";
import { useBrandModel } from "../../../services/hooks/Queries/useBrandModel";
import { IFilters } from "../../../services/hooks/Queries/useCars/@interfaces";
import { SelectChakra } from "../../shared/Forms/Select";

interface IProps {
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  children: React.ReactNode;
}

export function CarFilter({ setFilters, children }: IProps): JSX.Element {
  const { data, isLoading } = useBrandModel();

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedLowerPrice, setSelectedLowerPrice] = useState("");
  const [selectedHigherPrice, setSelectedHigherPrice] = useState("");

  function handleSearchCars(event: MouseEvent<HTMLButtonElement>) {
    const filters = {} as IFilters;

    if (selectedBrand) filters.brandName = selectedBrand;
    if (selectedModel) filters.modelName = selectedModel;
    if (Number(selectedHigherPrice))
      filters.maxPrice = Number(selectedHigherPrice) * 1000;
    if (Number(selectedLowerPrice))
      filters.minPrice = Number(selectedLowerPrice) * 1000;

    setFilters(filters);
  }

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
    if (Number(selectedLowerPrice) >= Number(price)) setSelectedLowerPrice("");
    setSelectedHigherPrice(price);
  }

  const onFilterModels = () => {
    if (!data || (data && !data?.models)) return [];
    if (!selectedBrand) return data.models;
    return data.models.filter((model) => model.brandName === selectedBrand);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const models = useMemo(() => onFilterModels(), [selectedBrand, data]);
  const brands = (data && data?.brands) || [];

  return (
    <VStack spacing={6} align="center">
      <Grid
        templateColumns={["repeat(2, 1fr)", null, null, "repeat(4, 1fr)"]}
        gap={["20px", "30px", "40px"]}
        align="center"
        w={"100%"}
      >
        <GridItem colSpan={[2, null, 1, 1]}>
          <SelectChakra
            label="Marca:"
            value={selectedBrand}
            onChange={handleSelectBrand}
            placeholder={isLoading ? "carregando..." : "Marca"}
          >
            {brands.map((brand) => (
              <option key={brand.name} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </SelectChakra>
        </GridItem>
        <GridItem colSpan={[2, null, 1, 1]}>
          <SelectChakra
            label="Modelo:"
            value={selectedModel}
            onChange={handleSelectModel}
            placeholder={isLoading ? "carregando..." : "Modelo"}
          >
            {models.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name}
              </option>
            ))}
          </SelectChakra>
        </GridItem>
        <GridItem colSpan={1}>
          <SelectChakra
            label="Preço de:"
            value={selectedLowerPrice}
            onChange={handleSelectPriceL}
            placeholder={isLoading ? "carregando..." : "De:"}
          >
            {PRICES.map((price) => (
              <option key={price} value={price}>
                {price}.000 R$
              </option>
            ))}
          </SelectChakra>
        </GridItem>
        <GridItem colSpan={1}>
          <SelectChakra
            label="Preço áte:"
            value={selectedHigherPrice}
            onChange={handleSelectPriceH}
            placeholder={isLoading ? "carregando..." : "Áte:"}
          >
            {PRICES.map((price) => (
              <option key={price} value={price}>
                {price}.000 R$
              </option>
            ))}
          </SelectChakra>
        </GridItem>
      </Grid>
      <HStack>
        <Button
          onClick={handleSearchCars}
          isLoading={isLoading}
          size={"md"}
          w={["100%", "100%", 400]}
          variant={"main"}
        >
          BUSCAR
        </Button>
        {children}
      </HStack>
    </VStack>
  );
}
