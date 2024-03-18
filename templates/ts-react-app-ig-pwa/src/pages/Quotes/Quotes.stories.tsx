import type { Meta, StoryObj } from '@storybook/react';

import QuotesPage from './Quotes';

const meta: Meta<typeof QuotesPage> = {
  title: 'Pages/Quotes Page',
  component: QuotesPage,
};

export default meta;
type Story = StoryObj<typeof QuotesPage>;

export const Primary: Story = {
  render: () => <QuotesPage />,
};