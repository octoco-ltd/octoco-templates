import type { Meta, StoryObj } from '@storybook/react';

import ListUsers from './ListUsers';

/**
 * Represents the metadata for the ListUsers component story.
 * @template T - The type of the ListUsers component.
 */
const meta: Meta<typeof ListUsers> = {
  title: 'Features/List Users',
  component: ListUsers,
};

export default meta;
type Story = StoryObj<typeof ListUsers>;

export const Primary: Story = {
  args: {},
};