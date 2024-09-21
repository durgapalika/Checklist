import { Checkbox, TextField, IconButton } from "@mui/material";
import { ItemContainer, StyledCheckbox, StyledInput } from "./components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  moveTodoDown,
  moveTodoUp,
  removeTodo,
  toggleTodo,
  updateTodo,
} from "../../ducks/todoSlice";
import { useAppDispatch } from "../../store";
import { ChangeEvent, useState } from "react";
import { ToDo } from "../../models";

interface ItemProps {
  index: number;
  item: ToDo;
  disableUp: boolean;
  disableDown: boolean;
}
const Item = ({ index, item, disableUp, disableDown }: ItemProps) => {
  const { id, completed, text } = item;
  const [value, setValue] = useState<string>(text);
  const dispatch = useAppDispatch();

  const updateItem = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  return (
    <ItemContainer>
      <StyledCheckbox
        onClick={() => {
          dispatch(toggleTodo({ id }));
        }}
      />

      <StyledInput
        value={value}
        $completed={completed}
        color="info"
        placeholder="New task..."
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          dispatch(updateTodo({ ...item, text: value }));
        }}
      />
      <IconButton
        color="info"
        onClick={() => {
          dispatch(moveTodoUp(index));
        }}
        disabled={disableUp}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
      <IconButton
        color="info"
        onClick={() => {
          dispatch(moveTodoDown(index));
        }}
        disabled={disableDown}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      <IconButton
        color={"error"}
        onClick={() => {
          dispatch(removeTodo({ id }));
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ItemContainer>
  );
};
export default Item;
