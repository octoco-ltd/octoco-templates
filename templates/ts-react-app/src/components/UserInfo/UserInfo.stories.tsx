import { ComponentMeta, ComponentStory } from '@storybook/react';
import UserInfo from './UserInfo';

/**
 * Story configuration for the UserInfo component.
 *
 * @title Cards/UserInfo
 * @component UserInfo
 * @argTypes {} // TODO: Add description for argTypes
 */
export default {
    title: 'Cards/UserInfo',
    component: UserInfo,
    argTypes: {},
} as ComponentMeta<typeof UserInfo>;

const Template: ComponentStory<typeof UserInfo> = () => <UserInfo />;

export const Default = Template.bind({});
