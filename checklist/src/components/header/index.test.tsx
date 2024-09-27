import { render, screen } from "@testing-library/react";
import Header from ".";

describe("Given Header", () => {
  it("should render header correctly", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("headerText")).toBeInTheDocument();
    expect(getByTestId("headerText")).toHaveTextContent("My checklist")
  });
});
