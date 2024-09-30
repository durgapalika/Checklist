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

const meta: Meta<typeof Item> = {
    title: "abc",

  component: Item,
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
type Story = StoryObj<typeof Item>;

export const SingleItem: Story = {
  args: {
    //👇 The args you need here will depend on your component
    item: mockTodoItem3,
    disableDown: false,
    disableUp: true,
    index: 0,
  },
};
