import { useMemo } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { UseOrderCalculatorArgs, UseOrderCalculatorPayload } from "./types";

const useOrderCalculator = ({
  foodList,
  tipPercentage
}: UseOrderCalculatorArgs): UseOrderCalculatorPayload => {
  const totalCost = foodList.reduce((acc, food) => acc + (parseFloat(food.cost) * food.amount), 0);
  const totalCostAndTip = totalCost + (totalCost * (parseFloat(tipPercentage) / 100));

  const formattedTotalCost = formatCurrency(totalCost);
  const formattedTotalCostAndTip = formatCurrency(totalCostAndTip);

  const payload = useMemo<UseOrderCalculatorPayload>(() => ({
    formattedTotalCost,
    formattedTotalCostAndTip,
  }), [
    formattedTotalCost,
    formattedTotalCostAndTip,
  ])

  return payload;
};

export default useOrderCalculator;
