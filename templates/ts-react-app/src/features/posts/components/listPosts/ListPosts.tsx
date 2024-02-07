import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { GridColDef, GridRowId, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Table from 'src/components/Table/Table';
import ConfirmationDialog from 'src/components/dialogs/ConfirmationDialog';
import EditFormDialog from 'src/components/dialogs/EditDialog';
import useRememberTable from 'src/hooks/useRememberTable';
import {
  useDeletePostByIdMutation,
  useGetAllPostsByUserQuery,
  usePatchPostByIdMutation,
} from 'src/services/restApi/queries/posts.service';

interface ListPostProps {
  userId?: string;
}

export default function ListPosts({ userId }: ListPostProps) {
  const { paginationModel, setPaginationModel } = useRememberTable();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [saveOption, setSaveOption] = useState(false);
  const [initialValues, setInitialValues] = useState<{[key: string]: string}>({});
  const [formFields, setFormFields] = useState<{ id: string, label: string, type: string }[]>([]);
  const [entityId, setEntityId] = useState<string>('');
  const [deleteOption, setDeleteOption] = useState<deleteOptionProps>({
    active: false,
    id: '',
  });
  const [editingCell, setEditingCell] =
    useState<handleEditCellChangeProps | null>(null);
  const [patchPostById] = usePatchPostByIdMutation();
  const [deletePostById] = useDeletePostByIdMutation();

  const { data, isError, isLoading, refetch, isFetching, isSuccess } =
    useGetAllPostsByUserQuery(userId ?? '5');
  interface deleteOptionProps {
    active: boolean;
    id: string;
  }

  interface handleEditCellChangeProps {
    id: string | number;
    field: string;
    value?: string;
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'body', headerName: 'Body', flex: 2 },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => {
        const onClick = () => {
          const idToDelete: string = params.row.id;
          setDeleteOption({ active: true, id: idToDelete });
        };

        return (
          <Button variant='text' color='secondary' onClick={onClick}>
            Delete
          </Button>
        );
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => {
        const onClick = () => {
          const formFields = [
            { id: 'title', label: 'Title', type: 'text' },
            { id: 'body', label: 'Body', type: 'text' },
          ];
          handleFormFields(formFields);
          const postToEdit = data?.find(post => post.id === params.row.id);
          handleEntityId(params.row.id);
          const initialValuesToSet = postToEdit ? { title: postToEdit.title, body: postToEdit.body } : {title: '', body: ''};
          handleInitialValues(initialValuesToSet);
          setSaveOption(true);
        };
        return (
          <Button variant='text' color='secondary' onClick={onClick}>
            Edit
          </Button>
        );
      },
    },

  ];

  const handleEntityId = (id: string) => {
    setEntityId(id);
  }

  const handleInitialValues = (initialValues: {[key: string]: string}) => {
    setInitialValues(initialValues);
  }

  const handleFormFields = (formFields: { id: string, label: string, type: string }[]) => {
    setFormFields(formFields);
  }

  const handleEditCellChange = ({
    id,
    field,
    value,
  }: handleEditCellChangeProps) => {
    setEditingCell({ id, field, value });
    setSaveOption(true);
  };

  const handleSaveDisable = () => {
    setSaveOption(false);
  };

  const handleDeleteDisable = () => {
    setDeleteOption({ active: false, id: '' });
  };

  const handleDelete = (id: string) => {
    if (isSuccess) {
      const postToDelete = data?.find((post) => post.id === id);
      if (postToDelete) {
        deletePostById(postToDelete.id);
        setRows(rows.filter((row) => row.id !== id));
        setDeleteOption({ active: false, id: '' });
      }
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setRows(data);
    }
  }, [data]);

  return (
    <>
      <Table
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        loading={isLoading}
        refetch={() => refetch()}
        isFetching={isFetching}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        totalRows={data?.length ?? 0}
        error={isError}
        onCellEditStop={handleEditCellChange}
      />
      <ConfirmationDialog
        actionFn={() => handleDelete(deleteOption.id)}
        onClose={handleDeleteDisable}
        open={deleteOption.active}
        title='Delete record'
        message='Do you want to delete the record?'
      ></ConfirmationDialog>
      <EditFormDialog open={saveOption} entityId={entityId} formFields={formFields} onClose={handleSaveDisable} updateFunction={patchPostById} initialValues={initialValues} ></EditFormDialog>
    </>
  );
}
