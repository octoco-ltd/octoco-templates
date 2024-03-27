import { Theme, useMediaQuery } from '@mui/material';
import { FC, ReactNode } from 'react';

import appConfig from 'src/config/appConfig';

interface HiddenWrapperProps {
    children: React.ReactNode;
    mobileOnly?: boolean;
    desktopOnly?: boolean;
}

/**
 * A wrapper component that conditionally hides its children based on the device type. The breakpoint for mobile is defined in the appConfig file.
 *
 * @component
 * @param {ReactNode} children - The children elements to be rendered.
 * @param {boolean} mobileOnly - Determines if the children should be hidden on mobile devices only. Default is false.
 * @param {boolean} desktopOnly - Determines if the children should be hidden on desktop devices only. Default is false.
 * @returns {ReactNode} - The rendered children React nodes if true - if none of the above is specified - nothing will be hidden.
 */
const HiddenWrapper: FC<HiddenWrapperProps> = ({ children, mobileOnly = false, desktopOnly = false, }: HiddenWrapperProps): ReactNode => {
    let hidden = false;

    if (mobileOnly && !desktopOnly) {
        // If the 'mobileOnly' flag is true and the 'desktopOnly' flag is false,
        // it means that the component should be hidden on desktop screens.
        // The 'hidden' variable is set based on the result of the 'useMediaQuery' hook,
        // which checks if the screen size matches the specified breakpoint for mobile view.
        hidden = useMediaQuery((theme: Theme) => theme.breakpoints.up(appConfig.breakMobileView));
    }

    if (desktopOnly && !mobileOnly) {
        // If the 'desktopOnly' flag is true and the 'mobileOnly' flag is false,
        // it means that the component should be hidden on mobile screens.
        // The 'hidden' variable is set based on the result of the 'useMediaQuery' hook,
        // which checks if the screen size matches the specified breakpoint for desktop view.
        hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down(appConfig.breakMobileView));
    }

    if (desktopOnly && mobileOnly) {
        // If both the 'desktopOnly' and 'mobileOnly' flags are true,
        // it means that the component should not be hidden on any screen size.
        hidden = false;
    }

    if (!desktopOnly && !mobileOnly) {
        // If both the 'desktopOnly' and 'mobileOnly' flags are false,
        // it means that the component should be hidden on any screen size.
        hidden = true;
    }

    return hidden ? null : children;
};

export default HiddenWrapper;