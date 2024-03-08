import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import { columns, rows } from './storyData';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

/**
 * Primary story for the Table component.
 *
 * @remarks
 * This story represents the primary usage of the Table component.
 *
 * @public
 */
export const Primary: Story = {
    args: {
      rows: rows,
      columns: columns, 
      pageSizeOptions: [5,10,20,50],
      loading: false
    },
};