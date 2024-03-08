import { Add, Edit } from '@mui/icons-material';
import { IconButton, Popover, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';
import React from 'react';

/**
 * Renders a component for adding a list of items.
 *
 * @param items - The currently selected items.
 * @param onRemoveItem - The callback function to remove an item from the list.
 * @param onAddItem - The callback function to add an item to the list.
 * @param originalItems - The original list of items to choose from.
 * @returns The JSX element representing the AddList component.
 */
export default function AddList({
  items,
  onRemoveItem,
  onAddItem,
  originalItems
}: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange = (e: any) => {
    if (e.target.checked) {
      onAddItem(e.target.name);
    } else {
      onRemoveItem(e.target.name);
    }
  };

  return (
    <>
      <IconButton aria-label="add" onClick={handleClick} aria-describedby={id}>
        <Edit />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box p={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Widgets</FormLabel>
            <FormGroup>
              {originalItems.map((i: any, index: number) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={items.includes(i)}
                      onChange={handleChange}
                      name={i}
                    />
                  }
                  label={originalItems[index]}
                  key={i}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </Popover>
    </>
  );
}
