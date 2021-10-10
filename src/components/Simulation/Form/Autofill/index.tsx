import { Box, Button, BoxProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { cepMask } from "../../../../utils/masks/cep.mask";
import { currencyMask } from "../../../../utils/masks/currency.mask";
import { numberMask } from "../../../../utils/masks/number.mask";
import { InputForm } from "../../../shared/Forms/HookForm/Input";
import { ChakraRadioGroup } from "../../../shared/Forms/HookForm/Ratio";
import { SimulationFormData } from "../@interfaces";
import faker from "faker/locale/pt_BR";

const fakeData = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  cpf: "401.951.858.03",
  phone: "(12) 99681-8163",
  birthDate: "26/08/1998",
  income: "R$ 10.000",
  haveHelp: "Não",
  dirtyName: "Não",
  address: {
    number: 1000,
    cep: "12246-000",
    street: "Rua Alfredo Ignacio Nogueira Penido",
    complement: "",
    neighborhood: "Jardim Aquarius",
    city: "São José dos Campos",
    estate: "SP",
  },
};

export function Autofill(props: BoxProps): JSX.Element {
  const { setValue } = useFormContext();

  function handleSetValues() {
    Object.entries(fakeData).map(([key, value]) => {
      if (typeof value === "object") {
        return Object.entries(value).map(([key2, value2]) => {
          setValue(`${key}.${key2}`, value2);
        });
      }
      setValue(key, value);
    });
  }

  return (
    <Box {...props}>
      <Button variant="main" onClick={handleSetValues}>
        Preenchimento automatico
      </Button>
    </Box>
  );
}
