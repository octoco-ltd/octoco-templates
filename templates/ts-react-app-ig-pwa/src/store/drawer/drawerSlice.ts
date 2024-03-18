import React from 'react';
import { StateCreator } from 'zustand';

// Define the state for the drawer
export interface DrawerState {
  isDrawerOpen: boolean;
  drawerDirection: 'left' | 'right' | 'top' | 'bottom';
  drawerWidth?: number; //in vw
  drawerContent: React.ReactNode;
  openDrawer: (options: DrawerOptions) => void;
  closeDrawer: () => void;
}

// Define options for the drawer
interface DrawerOptions {
  drawerDirection: 'left' | 'right' | 'top' | 'bottom';
  drawerContent: React.ReactNode;
}

// Create a store for managing the drawer state
export const createDrawerSlice: StateCreator<DrawerState> = (set) => ({
  isDrawerOpen: false,
  drawerDirection: 'left',
  drawerWidth: 40,
  drawerContent: null,
  openDrawer: (options) => set({ isDrawerOpen: true, ...options }),
  closeDrawer: () => set({ isDrawerOpen: false }),
});
