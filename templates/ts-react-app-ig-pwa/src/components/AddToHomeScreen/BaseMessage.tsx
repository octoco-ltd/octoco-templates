import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useAppZStore } from 'src/store/zStore';

interface Props {
    children: React.ReactNode;
}

export default function BaseMessage({ children }: Props) {
    const closeDialog = useAppZStore(state => state.closeDialog)
    return (
        <Box>

            <Typography variant="h6" gutterBottom textAlign={'center'}>
                Welcome to the Intelect CA companion app!
            </Typography>
            <Typography variant="body1" textAlign={'center'}>
                To enable all features of this app please add it to you home screen.
            </Typography>
            {children}
            <Box textAlign={'center'}>
                <Button onClick={closeDialog}>
                    Close
                </Button>
            </Box>
        </Box>
    )
}
