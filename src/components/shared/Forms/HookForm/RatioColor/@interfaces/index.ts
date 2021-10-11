import { RadioProps, StackProps } from "@chakra-ui/react";
import { Control } from "react-hook-form";

export interface IRadioGroupProps extends StackProps {
  control: Control<Record<string, string>>;
  label: string;
  name: string;
  ratioProps?: RadioProps;
  isRequired?: boolean;
}
