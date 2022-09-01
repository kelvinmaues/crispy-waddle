import React, { useEffect } from "react";
import {
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import SharedNumberInput from "../../shared/SharedNumberInput";

import { FoodItemFormProps } from "./types";
import { FoodItem } from "../types";

const NEW_FOOD_ITEM = {
  name: "",
  amount: 1,
  cost: "0",
}

const FoodItemForm: React.FC<FoodItemFormProps> = ({ 
  onAddFoodItem, 
  onEditFoodItem, 
  currentFoodItem 
}) => {
  const [foodItem, setFoodItem] = React.useState(NEW_FOOD_ITEM);

  useEffect(() => {
    if (currentFoodItem) {
      setFoodItem(currentFoodItem);
    }
  }, [currentFoodItem]);

  const resetForm = () => setFoodItem(NEW_FOOD_ITEM);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (currentFoodItem) {
      onEditFoodItem?.(foodItem);
    } else {
      onAddFoodItem?.(foodItem);
    }

    resetForm();
  };

  const onChangeField = (key: keyof FoodItem, value: number | string) => {
    setFoodItem({ ...foodItem, [key]: value });
  }

  const isBtnDisabled = foodItem.name.length === 0 || Number(foodItem.cost) === 0;
  const btnLabel = currentFoodItem ? "Edit" : "Add";

  return (
    <form onSubmit={onSubmitHandler}>
      <HStack alignItems="flex-end">
        <FormControl width="full">
          <FormLabel>Food</FormLabel>
          <Input
            name="food"
            value={foodItem.name}
            onChange={(e) => onChangeField("name", e.target.value)}
            required
            type="text"
            placeholder="Fries"
          />
        </FormControl>

        <SharedNumberInput.FormControl
          name="amount"
          label="Amount"
          min={1}
          value={foodItem.amount}
          onChange={(valueString) => onChangeField("amount", Number(valueString))}
        />

        <SharedNumberInput.FormControl
          name="cost"
          label="Cost"
          precision={2}
          step={0.2}
          value={foodItem.cost}
          onChange={(valueString) => onChangeField("cost", valueString as string)}
        />

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          disabled={isBtnDisabled}
        >
          {btnLabel}
        </Button>
      </HStack>
    </form>
  );
};

export default FoodItemForm;
