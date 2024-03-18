import type { Meta, StoryObj } from '@storybook/react';

import PriceListsPage from './PriceLists';

const meta: Meta<typeof PriceListsPage> = {
  title: 'Pages/PriceLists Page',
  component: PriceListsPage,
};

export default meta;
type Story = StoryObj<typeof PriceListsPage>;

export const Primary: Story = {
  render: () => <PriceListsPage />,
};