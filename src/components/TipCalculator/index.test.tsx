import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import TipCalculator from "./";

describe("TipCalculator", () => {
  test("should render the components correctly", () => {
    render(<TipCalculator />);

    expect(screen.getByText(/Tip Calculator/i)).toBeInTheDocument();

    expect(screen.getByRole("button")).toHaveTextContent("Add");

    expect(screen.getByText(/There is not items added./i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Tip/i)).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: "Tip" })).toHaveValue("0%");

    expect(screen.getByText("Total + Tip")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();

    const statItems = screen.getAllByText("$0.00");
    expect(statItems.length).toBe(2);
  });

  test("should add a food item", async () => {
    render(<TipCalculator />);

    const nameInput = screen.getByRole("textbox", { name: "Food" });
    const amountInput = screen.getByRole("spinbutton", { name: "Amount" });
    const costInput = screen.getByRole("spinbutton", { name: "Cost" });
    const submitBtn = screen.getByRole("button");

    fireEvent.change(nameInput, { target: { value: "Fries" } });
    fireEvent.change(amountInput, { target: { value: "2" } });
    fireEvent.change(costInput, { target: { value: "3.25" } });
    fireEvent.click(submitBtn);

    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);

    const items = getAllByRole("listitem");
    expect(items.length).toBe(1);

    const foodNames = items.map((item) => item.textContent);
    expect(foodNames).toMatchInlineSnapshot(`
      Array [
        "- 2x Fries @ $3.25RemoveEdit",
      ]
    `);
  });

  test("should add multiple food items", async () => {
    render(<TipCalculator />);

    const nameInput = screen.getByRole("textbox", { name: "Food" });
    const amountInput = screen.getByRole("spinbutton", { name: "Amount" });
    const costInput = screen.getByRole("spinbutton", { name: "Cost" });
    const addButton = screen.getByRole("button");
    const tipInput = screen.getByRole("spinbutton", { name: "Tip" });

    fireEvent.change(nameInput, { target: { value: "Pizza" } });
    fireEvent.change(amountInput, { target: { value: "3" } });
    fireEvent.change(costInput, { target: { value: "3.25" } });
    fireEvent.click(addButton);

    fireEvent.change(nameInput, { target: { value: "Papas" } });
    fireEvent.change(costInput, { target: { value: "10.25" } });
    fireEvent.click(addButton);

    fireEvent.change(nameInput, { target: { value: "Soda" } });
    fireEvent.change(amountInput, { target: { value: "2" } });
    fireEvent.change(costInput, { target: { value: "2.00" } });
    fireEvent.click(addButton);

    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);

    const items = getAllByRole("listitem");
    expect(items.length).toBe(3);

    const foodNames = items.map((item) => item.textContent);
    expect(foodNames).toMatchInlineSnapshot(`
      Array [
        "- 3x Pizza @ $3.25RemoveEdit",
        "- 1x Papas @ $10.25RemoveEdit",
        "- 2x Soda @ $2.00RemoveEdit",
      ]
    `);

    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(6);

    const statItems = screen.getAllByText("$24.00");
    expect(statItems.length).toBe(2);

    fireEvent.change(tipInput, { target: { value: 14.5 } });
    expect(screen.getByRole("spinbutton", { name: "Tip" })).toHaveValue("14.5%");

    expect(screen.getByText("$24.00")).toBeInTheDocument();
    expect(screen.getByText("$27.48")).toBeInTheDocument();
  });
});
