import { FoodList } from "../types";

export type UseOrderCalculatorArgs = {
  foodList: FoodList;
  tipPercentage: string;
};

export type UseOrderCalculatorPayload = {
  formattedTotalCost: string;
  formattedTotalCostAndTip: string;
}
