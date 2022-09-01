import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FoodItemForm from "./";

describe("FoodItemForm", () => {
  test("should render form components correctly", () => {
    render(<FoodItemForm />);

    expect(screen.getByLabelText(/Food/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Food" })).toHaveValue("");

    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: "Amount" })).toHaveValue("1");

    expect(screen.getByLabelText(/Cost/i)).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: "Cost" })).toHaveValue("0");

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    expect(screen.getByRole("button")).toHaveTextContent("Add");
  });

  it("should validate the input changes and behavior", async () => {
    render(<FoodItemForm />);

    const foodInput = screen.getByRole("textbox", { name: "Food" });
    const amountInput = screen.getByRole("spinbutton", { name: "Amount" });
    const costInput = screen.getByRole("spinbutton", { name: "Cost" });
    const submitBtn = screen.getByRole("button");

    fireEvent.change(foodInput, { target: { value: "Fries" } });
    expect(foodInput).toHaveValue("Fries");

    fireEvent.change(amountInput, { target: { value: 2 } });
    expect(amountInput).toHaveValue("2");

    fireEvent.change(costInput, { target: { value: 2.3 } });
    expect(costInput).toHaveValue("2.3");

    expect(submitBtn).toBeEnabled();
  });

  it("should validate the form submission when adding", async () => {
    const onAddFoodItem = jest.fn();

    render(
      <FoodItemForm
        onAddFoodItem={onAddFoodItem}
      />
    );

    const foodInput = screen.getByRole("textbox", { name: "Food" });
    const amountInput = screen.getByRole("spinbutton", { name: "Amount" });
    const costInput = screen.getByRole("spinbutton", { name: "Cost" });
    const submitBtn = screen.getByRole("button");

    fireEvent.change(foodInput, { target: { value: "Soda" } });
    fireEvent.change(amountInput, { target: { value: 4 } });
    fireEvent.change(costInput, { target: { value: 1.5 } });

    expect(submitBtn).toBeEnabled();
    fireEvent.click(submitBtn);
    expect(onAddFoodItem).toHaveBeenCalledTimes(1);

    expect(foodInput).toHaveValue("");
    expect(amountInput).toHaveValue("1");
    expect(costInput).toHaveValue("0");
    expect(submitBtn).toBeDisabled();
  });

  it("should validate the form submission when updating", async () => {
    const onEditFoodItem = jest.fn();

    const { rerender } = render(
      <FoodItemForm />
    );

    const foodInput = screen.getByRole("textbox", { name: "Food" });
    const amountInput = screen.getByRole("spinbutton", { name: "Amount" });
    const costInput = screen.getByRole("spinbutton", { name: "Cost" });
    const submitBtn = screen.getByRole("button");

    expect(foodInput).toHaveValue("");
    expect(amountInput).toHaveValue("1");
    expect(costInput).toHaveValue("0");
    expect(submitBtn).toBeDisabled();
    expect(screen.getByRole("button")).toHaveTextContent("Add");
    
    rerender(
      <FoodItemForm 
        currentFoodItem={{
          amount: 3,
          cost: "2.5",
          name: "Pizza",
        }}
        onEditFoodItem={onEditFoodItem}
      />
    )

    expect(foodInput).toHaveValue("Pizza");
    expect(amountInput).toHaveValue("3");
    expect(costInput).toHaveValue("2.5");
    expect(submitBtn).toBeEnabled();
    expect(screen.getByRole("button")).toHaveTextContent("Edit");
      
    fireEvent.click(submitBtn);
    expect(onEditFoodItem).toHaveBeenCalledTimes(1);

    expect(foodInput).toHaveValue("");
    expect(amountInput).toHaveValue("1");
    expect(costInput).toHaveValue("0");
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
