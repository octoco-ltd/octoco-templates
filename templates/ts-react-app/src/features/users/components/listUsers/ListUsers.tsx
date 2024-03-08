import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Table from 'src/components/Table/Table';
import useRememberTable from 'src/hooks/useRememberTable';
import { useGetAllUsersQuery } from 'src/services/restApi/queries/users.service';

/**
 * Renders a list of users in a table format.
 * 
 * @returns The ListUsers component.
 */
export default function ListUsers() {
  const { paginationModel, setPaginationModel } = useRememberTable();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const { data, isError, isLoading, refetch, isFetching, isSuccess } =
    useGetAllUsersQuery();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
  ]

  useEffect(() => {
    if (isSuccess && data) {
      setRows(
        data
      );
    }
  }, [data]);

  return (
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
    />
  );
}
