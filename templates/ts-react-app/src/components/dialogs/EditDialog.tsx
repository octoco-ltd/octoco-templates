import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { usePatchPostByIdMutation } from 'src/services/restApi/queries/posts.service';

interface editFormDialogProps {
    open: boolean;
    onClose: () => void;
    formFields: Array<{ id: string; label: string; type: string }>;
    initialValues: {[key: string]: string};
    entityId: string;
    updateFunction: (args: any) => { unwrap: () => Promise<any> };
  }

const EditFormDialog = ({ open, onClose, formFields, initialValues, entityId, updateFunction }: editFormDialogProps) => {
    const [formData, setFormData] = useState<{[key: string]: any}>(initialValues);
  
    const handleChange = (id: string, value: any) => {
      setFormData({ ...formData, [id]: value });
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await updateFunction({...formData, id: entityId}).unwrap();
      onClose();
    };

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);
  
    return (
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Dynamic Form</DialogTitle>
          <DialogContent>
            {formFields.map((field) => (
              <TextField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                fullWidth
                margin='dense'
                variant='outlined'
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  export default EditFormDialog;