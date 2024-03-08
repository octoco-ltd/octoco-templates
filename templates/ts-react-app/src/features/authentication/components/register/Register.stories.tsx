import type { Meta, StoryObj } from '@storybook/react';

import { Register } from './index';

/**
 * Meta information for the Register component story.
 *
 * @template TComponent - The type of the component being documented.
 */
const meta: Meta<typeof Register> = {
  title: 'Components/auth/Register',
  component: Register,
};

export default meta;
type Story = StoryObj<typeof Register>;

export const Primary: Story = {
  render: () => <Register />,
};