import { useEffect } from "react";
import { useAppSelector } from "../../store";
import Item from "../item";
import { ItemsContainer } from "./components";

const Items = () => {
  const todos = useAppSelector((state) => state.todos.toDos);
  return (
    <ItemsContainer data-testid="checklistItemsContainer">
      {todos.map((todo, index) => (
        <Item
          key={`${todo.text}-${todo.id}`}
          item={todo}
          index={index}
          disableUp={index === 0}
          disableDown={index === todos.length - 1}
        />
      ))}
    </ItemsContainer>
  );
};

export default Items;
