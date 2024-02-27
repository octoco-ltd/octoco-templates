import type { Meta, StoryObj } from '@storybook/react';

import ListUsers from './ListUsers';

const meta: Meta<typeof ListUsers> = {
  title: 'Features/List Users',
  component: ListUsers,
};

export default meta;
type Story = StoryObj<typeof ListUsers>;

export const Primary: Story = {
  args: {},
};