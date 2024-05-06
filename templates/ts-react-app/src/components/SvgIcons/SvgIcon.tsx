import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

import SvgIcons, { SvgIconsType } from './iconsFolder';

type IconsProps = {
  name: SvgIconsType;
} & SvgIconProps;

const CustomSvgIcon: FC<IconsProps> = ({ name, ...rest }) => {
  const Svg = SvgIcons[name];

  return (
    <SvgIcon {...rest}>
      <Svg {...rest} />
    </SvgIcon>
  );
};

export default CustomSvgIcon;
