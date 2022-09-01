import { useState } from "react";
import { Container, Heading, HStack, Stack } from "@chakra-ui/react";

import NewFoodItemForm from "./NewFoodItemForm";
import FoodList from "./FoodList";
import { FoodItem } from "./types";
import TipInput from "./TipInput";
import OrderSummary from "./OrderSummary";

const DEFAULT_LIST = [
  {
    name: "Hamburger",
    amount: 2,
    cost: 34.222,
  },
  {
    name: "Fries",
    amount: 2,
    cost: 15,
  },
];

const TipCalculator = () => {
  const [foodList, setFoodList] = useState<FoodItem[]>(DEFAULT_LIST);

  const onAddFoodItem = (foodItem: FoodItem) => {
    setFoodList([...foodList, foodItem]);
  };

  return (
    <Container py={6}>
      <Stack spacing={10}>
        <Heading>Tip Calculator</Heading>
        <NewFoodItemForm onAddFoodItem={onAddFoodItem} />
        <FoodList foodList={foodList} />
        <HStack spacing={8} alignItems="flex-end">
          <TipInput />
          <OrderSummary />
        </HStack>
      </Stack>
    </Container>
  );
};

export default TipCalculator;
