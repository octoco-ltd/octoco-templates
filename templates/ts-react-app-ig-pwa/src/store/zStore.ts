import { create } from 'zustand';
import { createDialogSlice, DialogState } from './dialog/dialogSlice';
import { createDrawerSlice, DrawerState } from './drawer/drawerSlice';

export const useAppZStore = create<DialogState & DrawerState>((...a) => ({
  ...createDialogSlice(...a),
  ...createDrawerSlice(...a),
}));
