import {
  mockStateWithEmptyTods,
  mockStateWithOneTodo,
  mockStateWithThreeTodos,
  mockTodoItem1,
  mockTodoItem2,
  mockTodoItem3,
} from "../__mocks__/mockstore";
import { IToDoState, ToDo } from "../models";
import todoSlice, {
  addTodo,
  moveTodoDown,
  moveTodoUp,
  removeTodo,
  toggleTodo,
  updateTodo,
} from "./todoSlice";

describe("todoSlice", () => {
  describe("State:", () => {
    it("state with no todos", () => {
      const state = todoSlice(mockStateWithEmptyTods, {
        type: "undefined",
      });
      expect(state).toBe(mockStateWithEmptyTods);
    });
    it("state with multiple todos", () => {
      const state = todoSlice(mockStateWithThreeTodos, {
        type: "undefined",
      });
      expect(state).toBe(mockStateWithThreeTodos);
    });
  });
  describe("actions:", () => {
    it("addTodo on empty state", () => {
      const expectedState: IToDoState = {
        pending: 0,
        toDos: [
          {
            completed: false,
            description: "description",
            id: 1,
            text: "",
          },
        ],
        completed: 0,
        total: 1,
      };
      const state = todoSlice(mockStateWithEmptyTods, addTodo());

      // Assert state
      expect(state.toDos).toHaveLength(1);
      expect(state).toEqual(expectedState);
    });
    it("addTodo on existing state", () => {
      const expectedState: IToDoState = {
        pending: 0,
        toDos: [
          {
            completed: false,
            description: "description",
            id: 2,
            text: "",
          },
          mockTodoItem1,
        ],
        completed: 0,
        total: 2,
      };
      const state = todoSlice(mockStateWithOneTodo, addTodo());

      // Assert state
      expect(state.toDos).toHaveLength(2);
      expect(state).toEqual(expectedState);
    });
    it("update text on existing todo", () => {
      const expectedState: IToDoState = {
        ...mockStateWithThreeTodos,
        toDos: [
          { ...mockTodoItem1, text: "updated task" },
          mockTodoItem2,
          mockTodoItem3,
        ],
      };
      const state = todoSlice(
        mockStateWithThreeTodos,
        updateTodo({ ...mockTodoItem1, text: "updated task" })
      );

      // Assert state
      expect(state.toDos).toHaveLength(3);
      expect(state).toEqual(expectedState);
    });
    it("toggle todo", () => {
      const expectedState: IToDoState = {
        ...mockStateWithThreeTodos,
        toDos: [
          { ...mockTodoItem1, completed: true },
          mockTodoItem2,
          mockTodoItem3,
        ],
        completed: 1,
      };
      const state = todoSlice(mockStateWithThreeTodos, toggleTodo({ id: 1 }));

      // Assert state
      expect(state.toDos).toHaveLength(3);
      expect(state).toEqual(expectedState);
    });
    it("toggle todo for already completed state", () => {
      const initialState: IToDoState = {
        ...mockStateWithThreeTodos,
        toDos: [
          { ...mockTodoItem1, completed: true },
          mockTodoItem2,
          mockTodoItem3,
        ],
        completed: 1,
      };
      const expectedState: IToDoState = {
        ...mockStateWithThreeTodos,
        toDos: [
          { ...mockTodoItem1, completed: false },
          mockTodoItem2,
          mockTodoItem3,
        ],
        completed: 0,
      };
      const state = todoSlice(initialState, toggleTodo({ id: 1 }));

      // Assert state
      expect(state.toDos).toHaveLength(3);
      expect(state).toEqual(expectedState);
    });
    it("moveTodoUp", () => {
      const expectedState: IToDoState = {
        ...mockStateWithThreeTodos,
        toDos: [mockTodoItem2, mockTodoItem1, mockTodoItem3],
      };
      const state = todoSlice(mockStateWithThreeTodos, moveTodoUp(1));

      // Assert state
      expect(state.toDos).toHaveLength(3);
      expect(state).toEqual(expectedState);
    });
    it("moveTodoDown", () => {
      const expectedState: IToDoState = {
        ...mockStateWithThreeTodos,
        toDos: [mockTodoItem1, mockTodoItem3, mockTodoItem2],
      };
      const state = todoSlice(mockStateWithThreeTodos, moveTodoDown(1));

      // Assert state
      expect(state.toDos).toHaveLength(3);
      expect(state).toEqual(expectedState);
    });
    it("removeTodo", () => {
      const expectedState: IToDoState = {
        ...mockStateWithThreeTodos,
        toDos: [mockTodoItem2, mockTodoItem3],
        total: 2,
      };
      const state = todoSlice(mockStateWithThreeTodos, removeTodo({ id: 1 }));

      // Assert state
      expect(state.toDos).toHaveLength(2);
      expect(state).toEqual(expectedState);
    });
  });
});
