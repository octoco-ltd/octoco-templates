import { ComponentMeta, ComponentStory } from '@storybook/react';
import UserAvatar from './UserAvatar';

/**
 * Story configuration for the UserAvatar component.
 */
export default {
    title: 'Avatar/UserAvatar',
    component: UserAvatar,
    argTypes: {},
} as ComponentMeta<typeof UserAvatar>;

const Template: ComponentStory<typeof UserAvatar> = (props) => <UserAvatar {...props} />;

export const Default = Template.bind({});
