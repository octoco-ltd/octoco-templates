import React from 'react';
import { create } from 'zustand';

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
/**
 * Represents the state and actions for managing a dialog.
 */
export const useDialogStore = create<DialogState>((set) => ({
  /**
   * Indicates whether the dialog is currently open or not.
   */
  isDialogOpen: false,

  /**
   * The content of the dialog.
   */
  dialogContent: null,

  /**
   * Indicates whether the dialog requires user interaction or not.
   */
  requiredInteraction: false,

  /**
   * Opens the dialog with the specified options.
   * @param options - The options for the dialog.
   */
  openDialog: (options: DialogOptions) => set({ isDialogOpen: true, ...options }),

  /**
   * Closes the dialog.
   */
  closeDialog: () => set({ isDialogOpen: false }),
}));

