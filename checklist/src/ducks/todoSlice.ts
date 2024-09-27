import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToDoState, ToDo } from "../models";
/* istanbul ignore else */

const initialState: IToDoState = {
  toDos: [],
  total: 0,
  completed: 0,
  pending: 0,
};

const updateCounts = (state: IToDoState) => {
  const completedTasks = state.toDos.filter(
    (todo) => todo.completed === true
  ).length;
  state.completed = completedTasks;
  state.total = state.toDos.length;
};

const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo(state) {
      const maxId = Math.max(...state.toDos.map((t) => t.id));
      const newToDo: ToDo = {
        id: maxId === -Infinity ? 1 : maxId + 1,
        text: "",
        completed: false,
        description: "description",
      };

      // insert at the top
      state.toDos.splice(0, 0, newToDo);
      updateCounts(state);
    },
    updateTodo(state, action: PayloadAction<ToDo>) {
      const { id, text, description } = action.payload;
      const todo = state.toDos.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
        todo.description = description;
      }
      updateCounts(state);
    },
    toggleTodo(state, action: PayloadAction<Pick<ToDo, "id">>) {
      const todo = state.toDos.find((todo) => todo.id === action.payload.id);
      if (todo) todo.completed = !todo.completed;
      updateCounts(state);
    },
    moveTodoUp(state, action: PayloadAction<number>) {
      if (action.payload > 0) {
        // get the selected item
        const selectedTodo = state.toDos[action.payload];

        // delete the selected item from array
        state.toDos.splice(action.payload, 1);

        if (selectedTodo) {
          // insert the selected item in the previouse index
          state.toDos.splice(action.payload - 1, 0, selectedTodo);
        }
      }
    },
    moveTodoDown(state, action: PayloadAction<number>) {
      if (action.payload < state.toDos.length) {
        // get the selected item
        const selectedTodo = state.toDos[action.payload];

        // delete the selected item from array
        state.toDos.splice(action.payload, 1);

        if (selectedTodo) {
          // insert the selected item in the next index
          state.toDos.splice(action.payload + 1, 0, selectedTodo);
        }
      }
    },
    removeTodo(state, action: PayloadAction<Pick<ToDo, "id">>) {
      const index = state.toDos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.toDos.splice(index, 1);
      }
      updateCounts(state);
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  moveTodoDown,
  moveTodoUp,
  updateTodo,
} = todosSlice.actions;
export default todosSlice.reducer;
