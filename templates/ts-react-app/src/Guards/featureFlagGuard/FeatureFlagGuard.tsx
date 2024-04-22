import {
  FlagKeys,
  getConfigValue,
} from 'src/features/authentication/clients/firebase/FirebaseAuthProvider';

interface FeatureFlagGuardProps {
  featureFlag: FlagKeys;
  children: JSX.Element;
  fallback?: JSX.Element | null;
}

/**
 * FeatureFlagGuard component.
 *
 * This component checks if a feature flag is enabled and renders its children if it is enabled.
 * If the feature flag is not enabled, it renders the fallback component.
 *
 * @param featureFlag - The feature flag to check.
 * @param children - The children components to render if the feature flag is enabled.
 * @param fallback - The fallback component to render if the feature flag is not enabled. Defaults to null.
 *
 * @returns The rendered children components if the feature flag is enabled, otherwise the fallback component.
 */
export const FeatureFlagGuard: React.FC<FeatureFlagGuardProps> = ({
  featureFlag,
  children,
  fallback = null,
}) => {
  const isEnabled = getConfigValue(featureFlag).asBoolean();

  if (isEnabled === false) {
    // Render the fallback component if the feature flag is disabled
    return fallback;
  }

  // Render the children components if the feature flag is enabled
  return children;
};
