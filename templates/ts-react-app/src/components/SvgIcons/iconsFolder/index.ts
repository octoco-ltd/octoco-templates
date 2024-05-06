// Import svg icons from iconsFolder as a react component
import { ReactComponent as Close } from './close.svg';

// Add all svg icons to an object
const SvgIcons = {
  Close,
};

// Export the object
export default SvgIcons;

// Export all svg icon names as a types
export type SvgIconsType = keyof typeof SvgIcons;
