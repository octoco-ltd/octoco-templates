import PropTypes from 'prop-types';
import { FC, ReactNode } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Box, useTheme } from '@mui/material';

interface ScrollbarProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Scrollbar component.
 *
 * @component
 * @param {ScrollbarProps} props - The props for the Scrollbar component.
 * @param {string} props.className - The class name for the Scrollbar component.
 * @param {ReactNode} props.children - The children elements for the Scrollbar component.
 * @returns {JSX.Element} The rendered Scrollbar component.
 */
const Scrollbar: FC<ScrollbarProps> = ({ className, children, ...rest }) => {
  const theme = useTheme();

  return (
    <Scrollbars
      autoHide
      renderThumbVertical={() => {
        return (
          <Box
            sx={{
              width: 5,
              background: `${theme.colors.alpha.black[10]}`,
              borderRadius: `${theme.general.borderRadiusLg}`,
              transition: `${theme.transitions.create(['background'])}`,

              '&:hover': {
                background: `${theme.colors.alpha.black[30]}`,
              },
            }}
          />
        );
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Scrollbar;
