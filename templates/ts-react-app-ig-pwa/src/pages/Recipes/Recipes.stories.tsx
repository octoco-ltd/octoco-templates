import type { Meta, StoryObj } from '@storybook/react';

import RecipesPage from './Recipes';

const meta: Meta<typeof RecipesPage> = {
  title: 'Pages/Recipes Page',
  component: RecipesPage,
};

export default meta;
type Story = StoryObj<typeof RecipesPage>;

export const Primary: Story = {
  render: () => <RecipesPage />,
};