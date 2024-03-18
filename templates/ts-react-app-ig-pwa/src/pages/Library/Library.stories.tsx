import type { Meta, StoryObj } from '@storybook/react';

import LibraryPage from './Library';

const meta: Meta<typeof LibraryPage> = {
  title: 'Pages/Library Page',
  component: LibraryPage,
};

export default meta;
type Story = StoryObj<typeof LibraryPage>;

export const Primary: Story = {
  render: () => <LibraryPage />,
};