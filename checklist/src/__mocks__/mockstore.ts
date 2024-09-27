import { configureStore } from "@reduxjs/toolkit";
import { RootState } from "../store";
import todosReducer from "../ducks/todoSlice";
import { IToDoState, ToDo } from "../models";

export const mockTodoItem1: ToDo = {
  id: 1,
  text: "task one",
  completed: false,
  description: "",
};

export const mockTodoItem2: ToDo = {
  id: 2,
  text: "task two",
  completed: false,
  description: "",
};

export const mockTodoItem3: ToDo = {
  id: 3,
  text: "task three",
  completed: false,
  description: "",
};

export const mockStateWithEmptyTods: IToDoState = {
  toDos: [],
  completed: 0,
  total: 0,
  pending: 0,
};

export const mockStateWithOneTodo: IToDoState = {
  toDos: [mockTodoItem1],
  completed: 0,
  total: 1,
  pending: 0,
};

export const mockStateWithTwoTodos: IToDoState = {
  toDos: [mockTodoItem1, mockTodoItem2],
  completed: 0,
  total: 2,
  pending: 2,
};

export const mockStateWithThreeTodos: IToDoState = {
  toDos: [mockTodoItem1, mockTodoItem2, mockTodoItem3],
  completed: 0,
  total: 3,
  pending: 3,
};

export const mockState: RootState = {
  todos: mockStateWithThreeTodos,
};

export const mockStore = (preloadedMockState: RootState) =>
  configureStore({
    reducer: {
      todos: todosReducer,
    },
    preloadedState: preloadedMockState,
  });
