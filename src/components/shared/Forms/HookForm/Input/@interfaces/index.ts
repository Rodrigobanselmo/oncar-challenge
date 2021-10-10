import { InputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

export interface IInputProps extends InputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError | null;
  mask?: (e: any) => any;
}
