import React from 'react';
import { StateCreator } from 'zustand';

// Define the state for the Dialog
export interface DialogState {
  isDialogOpen: boolean;
  dialogContent: React.ReactNode;
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
  requiredInteraction: boolean;
}

// Define options for the Dialog
interface DialogOptions {
  dialogContent: React.ReactNode;
  requiredInteraction?: boolean;
}

// Create a store for managing the dialog state
export const createDialogSlice: StateCreator<DialogState> = (set) => ({
  isDialogOpen: false,
  dialogContent: null,
  openDialog: (options: DialogOptions) => set({ isDialogOpen: true, ...options }),
  closeDialog: () => set({ isDialogOpen: false }),
  requiredInteraction: false,
});
