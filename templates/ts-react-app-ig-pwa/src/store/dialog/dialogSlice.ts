import React from 'react';
import { StateCreator } from 'zustand';

// Define the state for the Dialog
export interface DialogState {
  isDialogOpen: boolean;
  requireInteraction: boolean;
  dialogContent: React.ReactNode;
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

// Define options for the Dialog
interface DialogOptions {
  dialogContent: React.ReactNode;
  requireInteraction?: boolean;
}

export const createDialogSlice: StateCreator<DialogState> = (set) => ({
  isDialogOpen: false,
  dialogContent: null,
  requireInteraction: false,
  openDialog: (options: DialogOptions) => set({ isDialogOpen: true, ...options }),
  closeDialog: () => set({ isDialogOpen: false }),
});
