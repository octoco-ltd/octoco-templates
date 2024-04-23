import React from 'react';
import { create } from 'zustand';

export interface DrawerState {
  isDrawerOpen: boolean;
  drawerDirection: 'left' | 'right' | 'top' | 'bottom';
  drawerWidth?: number; //in vw
  drawerContent: React.ReactNode;
  openDrawer: (options: DrawerOptions) => void;
  closeDrawer: () => void;
}

interface DrawerOptions {
  drawerDirection: 'left' | 'right' | 'top' | 'bottom';
  drawerContent: React.ReactNode;
}

/**
 * Represents the state and actions related to the drawer in the application.
 */
export const useDrawerStore = create<DrawerState>((set) => ({
  isDrawerOpen: false,
  drawerDirection: 'left',
  drawerWidth: 40,
  drawerContent: null,
  /**
   * Opens the drawer with the specified options.
   * @param {DrawerOptions} options  - The options for opening the drawer.
   */
  openDrawer: (options) => set({ isDrawerOpen: true, ...options }),
  /**
   * Closes the drawer.
   */
  closeDrawer: () => set({ isDrawerOpen: false }),
}));

