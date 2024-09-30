import { render } from "@testing-library/react";
import Header from ".";

describe("Given Header components", () => {
  describe("StyledText", () => {
    it("Should render correctly", () => {
      const { asFragment } = render(<Header />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
