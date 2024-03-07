import { create } from 'zustand';
import { createDialogSlice, DialogState } from './dialog/dialogSlice';
import { createDrawerSlice, DrawerState } from './drawer/drawerSlice';

/**
 * Custom hook that creates and returns an instance of the application's Z store.
 *
 * @param a - Additional arguments that can be passed to the createDialogSlice and createDrawerSlice functions.
 * @returns An instance of the Z store.
 */
export const useAppZStore = create<DialogState & DrawerState>((...a) => ({
  ...createDialogSlice(...a),
  ...createDrawerSlice(...a),
}));
