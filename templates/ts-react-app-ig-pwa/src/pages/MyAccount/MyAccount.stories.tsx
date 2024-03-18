import type { Meta, StoryObj } from '@storybook/react';

import MyAccountPage from './MyAccount';

const meta: Meta<typeof MyAccountPage> = {
  title: 'Pages/MyAccount Page',
  component: MyAccountPage,
};

export default meta;
type Story = StoryObj<typeof MyAccountPage>;

export const Primary: Story = {
  render: () => <MyAccountPage />,
};