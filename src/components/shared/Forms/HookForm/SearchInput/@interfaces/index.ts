import { InputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

export interface IInputProps extends InputProps {
  name: string;
  label: string;
  options: string[];
  onChangeValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mask?: (e: any) => any;
}
