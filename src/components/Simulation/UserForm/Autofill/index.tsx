import {
  Box,
  Button,
  BoxProps,
  useDisclosure,
  Collapse,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { cepMask } from "../../../../utils/masks/cep.mask";
import { currencyMask } from "../../../../utils/masks/currency.mask";
import { numberMask } from "../../../../utils/masks/number.mask";
import { InputForm } from "../../../shared/Forms/HookForm/Input";
import { ChakraRadioGroup } from "../../../shared/Forms/HookForm/Ratio";
import { SimulationFormData } from "../@interfaces";
import faker from "faker/locale/pt_BR";
import { useEffect } from "react";

const fakeData = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  cpf: "401.951.858-03",
  phone: "(12) 99681-8163",
  birthDate: "26/08/1998",
  income: "R$ 10.000",
  haveHelp: "Não",
  dirtyName: "Não",
  address: {
    number: 1000,
    cep: "12246-000",
    street: "Alfredo Ignacio Nogueira Penido",
    complement: "",
    neighborhood: "Jardim Aquarius",
    city: "São José dos Campos",
    state: "SP",
  },
};

export function Autofill(props: BoxProps): JSX.Element {
  const { setValue } = useFormContext();
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      onToggle();
    }, 1000);
    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  function handleSetValues() {
    Object.entries(fakeData).map(([key, value]) => {
      if (typeof value === "object") {
        const spinner = document.getElementById("spinner_cep");
        if (spinner) spinner.style.display = "flex";
        setTimeout(() => {
          if (spinner) spinner.style.display = "none";
          setValue(key, value, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }, 1000);
        setValue("address.cep", "12246-000", {
          shouldDirty: true,
          shouldValidate: true,
        });
        return;
      }
      setValue(key, value);
    });
  }

  return (
    <Box
      border={"1px solid"}
      borderColor={useColorModeValue("gray.300", "gray.900")}
      p={2}
      borderRadius={20}
      bg={useColorModeValue("gray.100", "gray.800")}
      {...props}
    >
      <Collapse
        transition={{
          enter: { duration: 0.51 },
          exit: { duration: 2 },
        }}
        in={isOpen}
        animateOpacity
      >
        <Button w={"100%"} onClick={handleSetValues}>
          Preenchimento automatico
        </Button>
      </Collapse>
    </Box>
  );
}
