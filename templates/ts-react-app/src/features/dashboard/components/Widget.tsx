import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  id: string
  onRemoveItem: (itemId: string) => void
  component: ReactNode
  showBorder: boolean | undefined
}

/**
 * Renders a widget component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier for the widget.
 * @param {Function} props.onRemoveItem - The callback function to remove the widget.
 * @param {boolean} props.showBorder - Determines whether to show a border around the widget.
 * @param {React.Component} props.component - The component to render inside the widget.
 * @returns {JSX.Element} The rendered widget component.
 */
export default function Widget({ id, onRemoveItem, showBorder, component: Item }: Props) {
  return (
    showBorder ?
      <Paper sx={{ width: '100%', height: '100%' }} key={id}>
        {Item}
      </Paper> :
      <Box sx={{ width: '100%', height: '100%' }} key={id}>
        {Item}
      </Box>
  );
}
