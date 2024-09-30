import styled from "@emotion/styled";
import { Checkbox, InputBase } from "@mui/material";

export const ItemContainer = styled("div")`
  display: flex;
  gap: 0.5rem;
  padding: 0.4rem 0;
  align-items: center;
`;

export const StyledCheckbox = styled(Checkbox)`
  padding: 0;
`;

interface StyledInputProps {
  $completed: boolean;
}
export const StyledInput = styled(InputBase, {
  shouldForwardProp: (prop) => !String(prop).startsWith("$"),
})<StyledInputProps>`
  flex: 1;
  height: 1.5rem;
  padding: 1rem 0;
  border-radius: 1rem;
  input {
    padding: 0 0.5rem;
    text-decoration: ${({ $completed }) =>
      $completed ? "line-through" : "none"};

    color: ${({ $completed }) => ($completed ? "#EbE8E4" : "inherit")};
  }
  &:hover,
  &:active {
    border: 1px solid blue;
    color: blue;
  }
`;
