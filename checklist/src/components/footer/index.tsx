import { Button } from "@mui/material";
import { FooterContainer, StyledText } from "./components";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../store";
import { addTodo } from "../../ducks/todoSlice";

const Footer = () => {
  const { completed, total } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  return (
    <FooterContainer>
      <StyledText variant="h6">{`Completed ${completed} of ${total}`}</StyledText>
      <Button
        onClick={() => dispatch(addTodo())}
        color="primary"
        variant="contained"
      >
        <AddIcon /> <span>Add Item</span>
      </Button>
    </FooterContainer>
  );
};

export default Footer;
