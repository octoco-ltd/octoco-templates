import { Avatar, Box, Stack, Typography, styled } from '@mui/material';
import { useAuth } from 'src/features/authentication';

const CardWrapper = styled(Box)(
    () => `
            height: 113px;
            width: 262px;
            display: flex;
          `,
);

const UserInfo = () => {
    const { loading, user, error } = useAuth()

    return (
        <CardWrapper sx={{ mb: 3 }}>
            <Stack
                direction='column'
                spacing={1.5}
                alignItems='center'
                sx={{
                    width: '100%',
                }}
            >
                <Box>
                    <Avatar
                        src={user?.photoURL ?? ''}
                        imgProps={{
                            sx: {
                                referrerpolicy: 'no-referrer',
                                maskImage:
                                    'radial-gradient(circle, white 66%, rgba(255, 254, 255, 0.5) 10%)',
                            },
                        }}
                        sx={{
                            alt: 'Profile Picture of User',
                            height: 65,
                            width: 65,
                        }}
                    />
                </Box>
                <Stack spacing={0.5}>
                    <Stack>
                        <Typography variant='h6'>{user?.displayName}</Typography>
                        {user?.displayName !== user?.email && (
                            <Typography variant='body1'>{user?.email}</Typography>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </CardWrapper>
    );
};

export default UserInfo;
