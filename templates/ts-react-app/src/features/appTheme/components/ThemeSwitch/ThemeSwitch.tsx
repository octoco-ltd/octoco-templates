
import { selectTheme, toggleTheme } from '../../store/theme/themeSlice';
import { Button, Tooltip } from '@mui/material';
import { themeNames } from '../../store/theme/themeSlice.contracts';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppSelector, useAppDispatch } from 'src/hooks/hooks';

/**
 * Renders a theme switch button that toggles between light and dark mode.
 * @returns The rendered theme switch button.
 */
const ThemeSwitch = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  return (
    <Button onClick={() => dispatch(toggleTheme({}))}>
      <Tooltip arrow title={theme === themeNames.dark ? 'Light Mode' : 'Dark Mode'}>
        {theme === themeNames.dark ? <LightModeIcon /> : <DarkModeIcon />}
      </Tooltip>
    </Button>
  );
};

export default ThemeSwitch;
