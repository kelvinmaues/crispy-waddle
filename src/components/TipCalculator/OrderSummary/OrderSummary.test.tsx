import React from "react";
import { render, screen } from "@testing-library/react";
import OrderSummary from "./";

describe("OrderSummary", () => {
  test("should render the components correctly", () => {
    const { rerender } = render(
      <OrderSummary totalAndTipCost="0" totalCost="0" />
    );

    expect(screen.getByText("Total + Tip")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();

    const statItems = screen.getAllByText("0");
    expect(statItems.length).toBe(2);

    rerender(<OrderSummary totalAndTipCost="$10" totalCost="$5" />);
    const statItems2 = screen.getAllByText("$10");
    expect(statItems2.length).toBe(1);

    const statItems3 = screen.getAllByText("$5");
    expect(statItems3.length).toBe(1);
  });
});
