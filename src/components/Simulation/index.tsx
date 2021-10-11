import { Heading, Text, useDisclosure, Collapse } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useSetSimulation } from "../../services/hooks/Mutations/useSimulation";

import { MainContainer } from "../shared/Container/Main";
import { ScoreSection } from "./ScoreSection";
import { UserForm } from "./UserForm";
import { ValueForm } from "./ValueForm";

export function MainSimulation(): JSX.Element {
  const [score, setScore] = useState<{ value: number; message: string }>({
    value: 0,
    message: "",
  });

  const { isOpen: isOpenScore, onOpen: onOpenScore } = useDisclosure({
    defaultIsOpen: false,
  });
  const {
    isOpen: isOpenForm,
    onClose: onCloseForm,
    onOpen: onOpenForm,
  } = useDisclosure({ defaultIsOpen: false });

  return (
    <MainContainer>
      <Heading textAlign="center" mb={1}>
        QUERO AVALIAR MEU CRÉDITO
      </Heading>
      <Text as="h2" fontSize="xl" textAlign="center" mb={6}>
        Aqui na OnCar facilitamos a sua aprovação, mesmo com restrição no nome.
      </Text>
      <ValueForm onOpenForm={onOpenForm} onCloseForm={onCloseForm} />
      <Collapse
        transition={{
          enter: { duration: 2 },
          exit: { duration: 2 },
        }}
        in={isOpenScore}
        animateOpacity={true}
      >
        <ScoreSection score={score} />
      </Collapse>
      <Collapse
        transition={{
          enter: { duration: 1 },
          exit: { duration: 1 },
        }}
        in={isOpenForm}
        animateOpacity={true}
        unmountOnExit={true}
      >
        <UserForm setScore={setScore} onOpenScore={onOpenScore} />
      </Collapse>
    </MainContainer>
  );
}
