import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Badge, Tooltip } from '@mui/material';

interface UserAvatarProps {
    user?: any;
}

/**
 * Renders a user avatar with an optional verified badge.
 * @param {UserAvatarProps} props - The component props.
 * @param {User} props.user - The user object containing the user information.
 * @returns {JSX.Element} The rendered UserAvatar component.
 */
const UserAvatar = ({ user }: UserAvatarProps) => {

    return (
        <Badge
            overlap='circular'
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            badgeContent={
                <>
                    <Tooltip arrow placement='top' title=''>
                        <VerifiedIcon fontSize='large' />
                    </Tooltip>
                </>
            }
        >
            <Avatar
                src={user?.picture ? user.picture : ''}
                imgProps={{
                    sx: {
                        referrerpolicy: 'no-referrer',
                        maskImage:
                            'radial-gradient(circle, white 66%, rgba(255, 254, 255, 0.5) 10%)',
                    },
                }}
                sx={{
                    alt: 'Profile Picture of User',
                    height: { xs: 80, sm: 100, md: 120 },
                    width: { xs: 80, sm: 100, md: 120 },
                }}
            />
        </Badge>
    );
};

export default UserAvatar;
