import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { InputNumberFormControlProps } from "./types";

const SharedNumberInput: React.FC<NumberInputProps> & {
  FormControl: React.FC<InputNumberFormControlProps>;
} = (props) => {
  return (
    <NumberInput
      {...props}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

SharedNumberInput.FormControl = ({ label, ...props }: InputNumberFormControlProps): JSX.Element => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
      <SharedNumberInput {...props} />
  </FormControl>
);

export default SharedNumberInput;
