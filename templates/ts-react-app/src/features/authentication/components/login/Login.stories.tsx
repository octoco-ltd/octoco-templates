import type { Meta, StoryObj } from '@storybook/react';

import { Login } from './index';

/**
 * Meta information for the Login component story.
 *
 * @template T - The type of the component.
 */
const meta: Meta<typeof Login> = {
  title: 'Components/auth/Login',
  component: Login,
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Primary: Story = {
  render: () => <Login />,
};