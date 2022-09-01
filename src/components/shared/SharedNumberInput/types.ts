import { FormControlProps, NumberInputProps } from "@chakra-ui/react";

export type InputNumberFormControlProps = FormControlProps & NumberInputProps & {
  label: string;
};
