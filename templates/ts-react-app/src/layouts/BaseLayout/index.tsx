import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

interface BaseLayoutProps {
  children?: ReactNode;
}

/**
 * BaseLayout component represents the base layout for the application.
 * It provides a container for rendering the main content of the application.
 *
 * @param {BaseLayoutProps} props - The props for the BaseLayout component.
 * @param {ReactNode} props.children - The child components to be rendered inside the BaseLayout.
 * @returns {ReactNode} The rendered BaseLayout component.
 */
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
