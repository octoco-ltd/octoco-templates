import type { Meta, StoryObj } from '@storybook/react';

import RecommendationsPage from './Recommendations';

const meta: Meta<typeof RecommendationsPage> = {
  title: 'Pages/Recommendations Page',
  component: RecommendationsPage,
};

export default meta;
type Story = StoryObj<typeof RecommendationsPage>;

export const Primary: Story = {
  render: () => <RecommendationsPage />,
};