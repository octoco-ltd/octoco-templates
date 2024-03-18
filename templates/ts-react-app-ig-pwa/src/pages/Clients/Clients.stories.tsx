import type { Meta, StoryObj } from '@storybook/react';

import ClientsPage from './Clients';

const meta: Meta<typeof ClientsPage> = {
  title: 'Pages/Clients Page',
  component: ClientsPage,
};

export default meta;
type Story = StoryObj<typeof ClientsPage>;

export const Primary: Story = {
  render: () => <ClientsPage />,
};