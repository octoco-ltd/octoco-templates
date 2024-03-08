import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
/**
 * A custom hook that provides typed access to the Redux store state.
 *
 * @template T - The type of the state slice being selected.
 * @param selector - A function that selects a slice of the Redux store state.
 * @returns The selected state slice.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
