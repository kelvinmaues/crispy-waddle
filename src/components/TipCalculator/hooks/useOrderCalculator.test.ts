import { act, renderHook } from "@testing-library/react";

import useOrderCalculator from "./useOrderCalculator";

const FOOD_LIST = [
  { amount: 1, cost: "10", name: "Food 1" },
  { amount: 2, cost: "20", name: "Food 2" },
];

describe("useOrderCalculator", () => {
  it("should return the initial values", () => {
    const tipPercentage = "0";

    const { result } = renderHook(() =>
      useOrderCalculator({ foodList: [], tipPercentage })
    );

    expect(result.current.formattedTotalCost).toEqual("$0.00");
    expect(result.current.formattedTotalCostAndTip).toEqual("$0.00");
  });

  it("should return the correct values for some props updates", () => {
    const { result, rerender } = renderHook(useOrderCalculator, {
      initialProps: { foodList: FOOD_LIST, tipPercentage: "10" },
    });

    expect(result.current.formattedTotalCost).toEqual("$50.00");
    expect(result.current.formattedTotalCostAndTip).toEqual("$55.00");

    rerender({
      foodList: [...FOOD_LIST, { amount: 3, cost: "35.25", name: "Food 3" }],
      tipPercentage: "14.5",
    });

    expect(result.current.formattedTotalCost).toEqual("$155.75");
    expect(result.current.formattedTotalCostAndTip).toEqual("$178.33");

    rerender({
      foodList: [...FOOD_LIST, { amount: 3, cost: "35.25", name: "Food 3" }],
      tipPercentage: "22.5",
    });

    expect(result.current.formattedTotalCost).toEqual("$155.75");
    expect(result.current.formattedTotalCostAndTip).toEqual("$190.79");
  });
});
