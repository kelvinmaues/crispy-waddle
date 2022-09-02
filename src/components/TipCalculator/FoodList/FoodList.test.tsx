import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import FoodList from "./";

const FOOD_ITEMS = [
  {
    name: "Fries",
    amount: 2,
    cost: "3.25",
  },
  {
    name: "Pizza",
    amount: 1,
    cost: "5.5",
  },
  {
    name: "Soda",
    amount: 2,
    cost: "2.70",
  },
];

describe("FoodList", () => {
  test("should render the components correctly", () => {
    const { rerender } = render(<FoodList foodList={[]} />);

    expect(screen.getByText(/There is not items added./i)).toBeInTheDocument();

    rerender(<FoodList foodList={FOOD_ITEMS} />);

    expect(
      screen.queryByText(/There is not items added./i)
    ).not.toBeInTheDocument();
  });

  test("should render a list of items", async () => {
    render(<FoodList foodList={FOOD_ITEMS} />);

    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);

    const items = getAllByRole("listitem");
    expect(items.length).toBe(3);

    const foodNames = items.map((item) => item.textContent);
    expect(foodNames).toMatchInlineSnapshot(`
      Array [
        "- 2x Fries @ $3.25RemoveEdit",
        "- 1x Pizza @ $5.50RemoveEdit",
        "- 2x Soda @ $2.70RemoveEdit",
      ]
    `);

    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(6);
  });

  test("should trigger remove and edit functions for an item", async () => {
    const onRemove = jest.fn();
    const onEdit = jest.fn();

    render(
      <FoodList foodList={FOOD_ITEMS} onRemove={onRemove} onEdit={onEdit} />
    );

    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);

    const buttons = getAllByRole("button");
    const removeBtn1 = buttons[0];
    const editBtn1 = buttons[1];

    fireEvent.click(removeBtn1);
    expect(onRemove).toHaveBeenCalledTimes(1);

    fireEvent.click(editBtn1);
    expect(onEdit).toHaveBeenCalledTimes(1);

    const removeBtn2 = buttons[2];
    const editBtn2 = buttons[3];

    fireEvent.click(removeBtn2);
    expect(onRemove).toHaveBeenCalledTimes(2);

    fireEvent.click(editBtn2);
    expect(onEdit).toHaveBeenCalledTimes(2);
  });
});
