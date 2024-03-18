import { Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ILogoInterface {
  height?: number | string;
  width?: number | string;
}

function Logo(props: ILogoInterface) {
  const { height = 'auto', width = 'auto' } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home')
  }

  return (
    <Box>
      <img src={theme.palette.mode === 'dark' ? '/static/images/brand/logoAndName.svg' : '/static/images/brand/logoAndName.svg'} alt='Logo' height={height} width={width} onClick={handleLogoClick} />
    </Box>
  );
}

export default Logo;
