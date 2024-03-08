import { useContext } from 'react';
import { AuthContext } from '..';

/**
 * Custom hook that returns the authentication context.
 * @returns The authentication context.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};