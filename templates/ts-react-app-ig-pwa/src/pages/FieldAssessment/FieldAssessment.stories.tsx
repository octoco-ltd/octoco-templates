import type { Meta, StoryObj } from '@storybook/react';

import FieldAssessmentPage from './FieldAssessment';

const meta: Meta<typeof FieldAssessmentPage> = {
  title: 'Pages/FieldAssessment Page',
  component: FieldAssessmentPage,
};

export default meta;
type Story = StoryObj<typeof FieldAssessmentPage>;

export const Primary: Story = {
  render: () => <FieldAssessmentPage />,
};