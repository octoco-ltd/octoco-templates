import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

type DebouncedStateSetter<T> = (value: T) => void;

/**
 * A hook that returns a debounced state value and a function to update it.
 * @template T The type of the state value.
 * @param initialValue The initial value of the state.
 * @param delay The delay in milliseconds before updating the state.
 * @returns A tuple containing the current state value and a function to update it.
 * @example const [value, setValue] = useDebouncedState(0, 500);
 */
export default function useDebouncedState<T>(initialValue: T, delay = 500): [T, DebouncedStateSetter<T>] {
  const [state, setState] = useState<T>(initialValue);

  const debouncedSetState = useCallback(
    debounce((value: T) => {
      setState(value);
    }, delay),
    []
  );

  const handleStateChange: DebouncedStateSetter<T> = (value: T) => {
    debouncedSetState(value);
  };

  return [state, handleStateChange];
}
