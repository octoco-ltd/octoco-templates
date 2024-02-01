import type { Meta, StoryObj } from '@storybook/react';

import InvalidEnv from './InvalidEnv';

const meta: Meta<typeof InvalidEnv> = {
    title: 'Pages/Status/InvalidEnv',
    component: InvalidEnv,
};

export default meta;
type Story = StoryObj<typeof InvalidEnv>;

export const Primary: Story = {
    render: () => <InvalidEnv />,
};
