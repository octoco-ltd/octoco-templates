import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';

/**
 * Renders the header buttons component.
 *
 * @returns The rendered header buttons component.
 */
function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      {/*<HeaderSearch />*/}
      <Box sx={{ mx: 0.5 }} component='span'>
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
