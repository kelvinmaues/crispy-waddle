import { useState } from "react";
import { Container, Heading, HStack, Stack } from "@chakra-ui/react";

import FoodItemForm from "./FoodItemForm";
import FoodList from "./FoodList";
import OrderSummary from "./OrderSummary";
import TipInput from "./TipInput";
import useOrderCalculator from "./hooks/useOrderCalculator";
import { FoodItem } from "./types";

// const DEFAULT_LIST = [
//   {
//     name: "Hamburger",
//     amount: 2,
//     cost: 34.222,
//   },
//   {
//     name: "Fries",
//     amount: 2,
//     cost: 15,
//   },
// ];

const TipCalculator = () => {
  const [foodList, setFoodList] = useState<FoodItem[]>([]);
  const [tipPercentage, setTipPercentage] = useState("0");
  const [itemPosition, setItemPosition] = useState<null | number>(null);

  const { formattedTotalCost, formattedTotalCostAndTip } = useOrderCalculator({
    foodList,
    tipPercentage,
  });

  const onAddFoodItem = (foodItem: FoodItem) => {
    setFoodList([...foodList, foodItem]);
  };

  const onRemoveFoodItem = (index: number) => {
    setFoodList(foodList.filter((_, i) => i !== index));
  };

  const onEditFoodItem = (foodItem: FoodItem) => {
    const newList = [...foodList];
    newList[itemPosition!] = foodItem;
    setFoodList(newList);
    setItemPosition(null);
  };

  const currentFoodItem = foodList.find((_, i) => i === itemPosition);

  return (
    <Container py={6}>
      <Stack spacing={10}>
        <Heading>Tip Calculator</Heading>

        <FoodItemForm
          onAddFoodItem={onAddFoodItem}
          onEditFoodItem={onEditFoodItem}
          currentFoodItem={currentFoodItem}
        />

        <FoodList
          foodList={foodList}
          onRemove={onRemoveFoodItem}
          onUpdate={setItemPosition}
        />

        <HStack spacing={8} alignItems="flex-end">
          <TipInput value={tipPercentage} onChange={setTipPercentage} />
          <OrderSummary
            totalAndTipCost={formattedTotalCostAndTip}
            totalCost={formattedTotalCost}
          />
        </HStack>
      </Stack>
    </Container>
  );
};

export default TipCalculator;
