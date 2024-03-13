import { FC } from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';

import appConfig from 'src/config/appConfig';

/**
 * A wrapper component which only renders its children if the screen is smaller than the config breakpoint (i.e. a mobile screen).
 */
const MobileWrapper: FC<BoxProps> = ({ children, sx, ...rest }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                [theme.breakpoints.up(appConfig.breakMobileView)]: {
                    display: 'none',
                },
                ...sx,
            }}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default MobileWrapper;