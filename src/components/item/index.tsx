import { IconButton } from "@mui/material";
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
import { useState } from "react";
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

  return (
    <ItemContainer data-testid={`checklistItem-container-${index}`}>
      <StyledCheckbox
        onClick={() => {
          dispatch(toggleTodo({ id }));
        }}
        data-testid={`checkbox-${index}`}
        checked={completed}
      />

      <StyledInput
        value={value}
        $completed={completed}
        color="info"
        placeholder="New task..."
        onChange={(e) => setValue(e.target.value)}
        data-testid={`checklistItem-text-${index}`}
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
        data-testid={`btnMoveUp-${index}`}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
      <IconButton
        color="info"
        onClick={() => {
          dispatch(moveTodoDown(index));
        }}
        disabled={disableDown}
        data-testid={`btnMoveDown-${index}`}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      <IconButton
        color={"error"}
        onClick={() => {
          dispatch(removeTodo({ id }));
        }}
        data-testid={`btnDelete-${index}`}
      >
        <DeleteIcon />
      </IconButton>
    </ItemContainer>
  );
};
export default Item;
