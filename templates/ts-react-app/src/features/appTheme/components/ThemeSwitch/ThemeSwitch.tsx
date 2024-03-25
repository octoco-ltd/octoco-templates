
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Button, Tooltip } from '@mui/material';
import { themeNames, useThemeStore } from 'src/store/theme/themeStore';

const ThemeSwitch = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);

  return (
    <Button onClick={() => toggleTheme()}>
      <Tooltip arrow title={theme === themeNames.dark ? 'Light Mode' : 'Dark Mode'}>
        {theme === themeNames.dark ? <LightModeIcon /> : <DarkModeIcon />}
      </Tooltip>
    </Button>
  );
};

export default ThemeSwitch;
