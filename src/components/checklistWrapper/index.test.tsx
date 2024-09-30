import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import {
  mockState,
  mockStateWithThreeTodos,
  mockStore,
} from "../../__mocks__/mockstore";
import { Provider } from "react-redux";
import ChecklistWrapper from ".";
import { Store, UnknownAction } from "redux";
import { IToDoState } from "../../models";

describe("Interactions with list", () => {
  let mockDispatch: any;
  let mockStoreWithTodos: Store<{ todos: IToDoState; }, UnknownAction, unknown>;
  beforeEach(() => {
    mockStoreWithTodos = mockStore({
      ...mockState,
      todos: mockStateWithThreeTodos,
    });
    mockDispatch = jest.spyOn(mockStoreWithTodos, "dispatch");
    render(
      <Provider store={mockStoreWithTodos}>
        <ChecklistWrapper />
      </Provider>
    );
  });
  afterEach(() => {
    cleanup();
  });
  it("should add new item when `Add` button is clicked", () => {
    // status has total 3 items
    expect(screen.getByTestId("status-text")).toHaveTextContent(
      "Completed 0 of 3"
    );

    // click the add button
    const addItemButton = screen.getByTestId("btnAddItem");
    fireEvent.click(addItemButton);

    // check redux action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith({ type: "todos/addTodo" });

    // count is updated to 4 items
    expect(screen.getByTestId("status-text")).toHaveTextContent(
      "Completed 0 of 4"
    );
  });
  it("should complete the item when checkbox is checked", () => {
    // status has total 3 items
    expect(screen.getByTestId("status-text")).toHaveTextContent(
      "Completed 0 of 3"
    );

    // click the add button
    const firstCheckbox = screen.getByTestId("checkbox-0");
    fireEvent.click(firstCheckbox);

    // check redux action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "todos/toggleTodo",
      payload: { id: 1 },
    });

    // count is updated to 4 items
    expect(screen.getByTestId("status-text")).toHaveTextContent(
      "Completed 1 of 3"
    );
  });
  it("should update the item when textfield is blurred", () => {
    const firstTextBox = screen
      .getByTestId("checklistItem-text-0")
      .querySelector("input");
    fireEvent.change(firstTextBox!, { target: { value: "updated task" } });
    fireEvent.blur(firstTextBox!);

    // check redux action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "todos/updateTodo",
      payload: mockStoreWithTodos.getState().todos.toDos[0],
    });
  });
  it("should have correct button enable and disable", () => {
    // first moveUp button should be disabled and rest should be enabled
    expect(screen.getByTestId("btnMoveUp-0")).toBeDisabled();
    expect(screen.getByTestId("btnMoveUp-1")).toBeEnabled();
    expect(screen.getByTestId("btnMoveUp-2")).toBeEnabled();

    // last moveDown button should be disabled and rest should be enabled
    expect(screen.getByTestId("btnMoveDown-0")).toBeEnabled();
    expect(screen.getByTestId("btnMoveDown-1")).toBeEnabled();
    expect(screen.getByTestId("btnMoveDown-2")).toBeDisabled();
  });
  it("should move the task up on moveUpClick", async () => {
    // get the second moveup button in list
    const secondMoveUpButton = await screen.findByTestId("btnMoveUp-1");

    // check the first item has a text `task one`
    expect(
      screen.getByTestId("checklistItem-text-0").querySelector("input")?.value
    ).toBe("task one");
    expect(
      screen.getByTestId("checklistItem-text-1").querySelector("input")?.value
    ).toBe("task two");

    // click on moveup botton on second row
    fireEvent.click(secondMoveUpButton);

    // check the redux action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "todos/moveTodoUp",
      payload: 1,
    });

    // after moving up, now the first item should be `task two`
    expect(
      screen.getByTestId("checklistItem-text-0").querySelector("input")?.value
    ).toBe("task two");
    expect(
      screen.getByTestId("checklistItem-text-1").querySelector("input")?.value
    ).toBe("task one");
  });
  it("should move the task down on moveDownClick", async () => {
    // get the second moveDown button in list
    const secondMoveDownButton = await screen.findByTestId("btnMoveDown-1");

    // check the text on second and third items before move up click
    expect(
      screen.getByTestId("checklistItem-text-1").querySelector("input")?.value
    ).toBe("task two");
    expect(
      screen.getByTestId("checklistItem-text-2").querySelector("input")?.value
    ).toBe("task three");

    // click on movedown botton on second row
    fireEvent.click(secondMoveDownButton);

    // check the redux action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "todos/moveTodoDown",
      payload: 1,
    });

    // after moving down, now the second and third items should swap
    expect(
      screen.getByTestId("checklistItem-text-1").querySelector("input")?.value
    ).toBe("task three");
    expect(
      screen.getByTestId("checklistItem-text-2").querySelector("input")?.value
    ).toBe("task two");
  });

  it("should delete the item when delete is clicked", () => {
    // check `task one` exist in DOM before delete
    expect(
      screen.getByTestId("checklistItem-text-0").querySelector("input")?.value
    ).toBe("task one");

    // get the first delete button
    const firstDeleteButton = screen.getByTestId("btnDelete-0");
    fireEvent.click(firstDeleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "todos/removeTodo",
      payload: { id: 1 },
    });
    // expect(mockStoreWithTodos.getState().todos.toDos).toHaveLength(2);

    // check `task one` does not exist in DOM after delete
    const textFields = screen
      .getByTestId("checklistItemsContainer")
      .querySelectorAll("input");

    // iterate through each input field and check `task one` does not exist
    textFields.forEach((textField) => {
      expect(textField.value).not.toBe("task one");
    });
  });
});
