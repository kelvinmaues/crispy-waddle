import React from "react";
import {
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import SharedNumberInput from "../../shared/SharedNumberInput";

import { NewFoodItemFormProps } from "./types";

const NewFoodItemForm: React.FC<NewFoodItemFormProps> = ({ onAddFoodItem }) => {
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(1);
  const [cost, setCost] = React.useState("0");

  const resetForm = () => {
    setName("");
    setAmount(1);
    setCost("0");
  };

  const onAddNewFood = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    resetForm();
    onAddFoodItem?.({ name, amount, cost: Number(cost) });
  };

  const isBtnDisabled = name.length === 0 || Number(cost) === 0;

  return (
    <form onSubmit={onAddNewFood}>
      <HStack alignItems="flex-end">
        <FormControl width="full">
          <FormLabel>Food</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            placeholder="Fries"
          />
        </FormControl>

        <SharedNumberInput.FormControl
          label="Amount"
          min={1}
          value={amount}
          onChange={(valueString) => setAmount(Number(valueString))}
        />

        <SharedNumberInput.FormControl
          label="Cost"
          precision={2}
          step={0.2}
          value={cost}
          onChange={(valueString) => setCost(valueString as string)}
        />

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          disabled={isBtnDisabled}
        >
          Add Food
        </Button>
      </HStack>
    </form>
  );
};

export default NewFoodItemForm;
