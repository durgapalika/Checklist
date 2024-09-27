import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import {
  mockState,
  mockStateWithEmptyTods,
  mockStateWithOneTodo,
  mockStateWithThreeTodos,
  mockStore,
} from "../../__mocks__/mockstore";
import Items from ".";
import { removeTodo, moveTodoUp, moveTodoDown } from "../../ducks/todoSlice";
import { Provider } from "react-redux";

describe("Given Items", () => {
  describe("Empty List", () => {
    it("Should not have any itmes", async () => {
      const { queryByTestId } = render(
        <Provider
          store={mockStore({
            ...mockState,
            todos: mockStateWithEmptyTods,
          })}
        >
          <Items />
        </Provider>
      );
      expect(queryByTestId("checklistItem-1")).toBeNull();
    });
  });
  describe("List with single item", () => {
    it("Should have one itmem", async () => {
      const { queryByTestId } = render(
        <Provider
          store={mockStore({
            ...mockState,
            todos: mockStateWithOneTodo,
          })}
        >
          <Items />
        </Provider>
      );
      expect(queryByTestId("checklistItem-0")).not.toBeNull();
      expect(queryByTestId("checklistItem-1")).toBeNull();
    });
  });
  describe("List with three items", () => {
    it("Should have three items", async () => {
      const { queryByTestId } = render(
        <Provider
          store={mockStore({
            ...mockState,
            todos: mockStateWithThreeTodos,
          })}
        >
          <Items />
        </Provider>
      );
      expect(screen.queryByTestId("checklistItem-0")).not.toBeNull();
      expect(screen.queryByTestId("checklistItem-1")).not.toBeNull();
      expect(screen.queryByTestId("checklistItem-2")).not.toBeNull();
    });
  });
});
