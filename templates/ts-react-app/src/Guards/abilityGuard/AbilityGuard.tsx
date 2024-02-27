import { Box } from '@mui/material';
import { useContext } from 'react';
import { AbilityContext } from 'src/context/canContext';
import Status404 from 'src/pages/Fallbacks/Status/Status404/Status404';

interface Props {
  // Identifier for the action to be checked
  i: string;
  // Identifier for the resource or object on which the action is performed
  a: string;
  // Fallback JSX element to be rendered if the user lacks the required ability
  fallback?: JSX.Element | null;
  // Flag to control whether to show the fallback or not (default is false)
  showFallback?: boolean;
  // The main content or children to be rendered if the user has the required ability
  children: JSX.Element;
}

/**
 * AbilityGuard component to conditionally render content based on CASL abilities defined.
 * @param i - Identifier for the action to be checked.
 * @param a - Identifier for the resource or object on which the action is performed
 * @param fallback - The fallback component to show if the user does not have access
 * @param {boolean} showFallback  - Whether to show a fallback component or nothing
 * @param children - The children that is wrapped by the AbilityGuard
 * @returns {Ability} - An instance of the defined abilities for the user.
 */
export const AbilityGuard = ({ i, a, fallback, showFallback = false, children }: Props) => {
  // Access the abilities from the context
  const ability = useContext(AbilityContext);

  // Check if the user has the required ability
  if (ability.can(i, a)) {
    // Render the main content if the user has the ability
    return children;
  } else {
    // Render fallback content if user lacks the required ability
    if (showFallback) {
      // Check if a custom fallback element is provided
      if (fallback) {
        return fallback;
      } else {
        return (
          <Box mt={10}>
            <Status404 />
          </Box>
        );
      }
    } else {
      // Do not render anything if showFallback is set to false
      return <></>;
    }
  }
};
