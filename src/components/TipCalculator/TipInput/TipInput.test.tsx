import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TripInput from "./";

describe("TripInput", () => {
  test("should render the component correctly", () => {
    const onChange = jest.fn();

    render(<TripInput value="0" onChange={onChange} />);

    expect(screen.getByLabelText(/Tip/i)).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toHaveValue("0%");
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test("should on change the component", () => {
    const onChange = jest.fn();

    const { rerender } = render(<TripInput value="0" onChange={onChange} />);

    const tipInput = screen.getByRole("spinbutton");

    fireEvent.change(tipInput, { target: { value: 12 } });
    expect(onChange).toHaveBeenCalledTimes(1);

    rerender(<TripInput value="12" onChange={onChange} />);
    expect(tipInput).toHaveValue("12%");
  });
});
