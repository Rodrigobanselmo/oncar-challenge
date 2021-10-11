import { InputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

export interface IInputProps extends InputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  onChangeValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError | null;
  mask?: (e: any) => any;
}
