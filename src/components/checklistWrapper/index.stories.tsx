import type { Meta, StoryObj } from "@storybook/react";
import Item from ".";
import {
  mockState,
  mockStateWithEmptyTods,
  mockStateWithThreeTodos,
  mockStore,
  mockTodoItem1,
  mockTodoItem3,
} from "../../__mocks__/mockstore";
import { Provider } from "react-redux";
import ChecklistWrapper from ".";

const meta: Meta<typeof ChecklistWrapper> = {
  title: "abc",
  component: ChecklistWrapper,
  decorators: [
    (Story) => (
      <Provider
        store={mockStore({
          ...mockState,
          todos: mockStateWithThreeTodos,
        })}
      >
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChecklistWrapper>;

export const Items: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
