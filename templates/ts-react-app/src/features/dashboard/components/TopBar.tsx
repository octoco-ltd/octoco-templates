import IconButton from '@mui/material/IconButton';
import { Save } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import AddList from './AddList';

interface Props {
  onLayoutSave: any,
  items: any,
  onRemoveItem: any,
  onAddItem: any,
  originalItems: any,
  heading: string,
  canEdit: boolean,
  autoSave?: boolean,
}

/**
 * Renders the top bar component.
 *
 * @param {Props} props - The component props.
 * @param {Function} props.onLayoutSave - The function to handle layout save.
 * @param {Array} props.items - The list of items.
 * @param {Function} props.onRemoveItem - The function to handle item removal.
 * @param {Function} props.onAddItem - The function to handle item addition.
 * @param {Array} props.originalItems - The original list of items.
 * @param {string} props.heading - The heading text.
 * @param {boolean} props.canEdit - Indicates if the component is editable.
 * @param {boolean} props.autoSave - Indicates if the component should auto-save.
 * @returns {JSX.Element} The rendered top bar component.
 */
export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems,
  heading,
  canEdit,
  autoSave
}: Props) {

  return (
    <Box sx={{ mx: 1, mt: 3 }}>
      <Typography variant='h1'>
        {heading}
      </Typography>
      {canEdit &&
        <>
          <AddList
            items={items}
            onRemoveItem={onRemoveItem}
            onAddItem={onAddItem}
            originalItems={originalItems}
          />
          {!autoSave &&
            <IconButton aria-label="save" onClick={onLayoutSave}>
              <Save />
            </IconButton>
          }
        </>
      }
    </Box>
  );
}
