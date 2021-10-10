import { InputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

export interface IInputProps extends InputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  error?: FieldError | null;
  mask?: (e: any) => any;
}
