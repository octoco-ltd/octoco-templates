import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'src/components/Table/Table';
import useRememberTable from 'src/hooks/useRememberTable';
import { useGetAllUsersQuery } from 'src/services/restApi/queries/users.service';

export default function ListUsers() {
  const { paginationModel, setPaginationModel } = useRememberTable();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const { data, isError, isLoading, refetch, isFetching, isSuccess } =
    useGetAllUsersQuery();

  const navigate = useNavigate();

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
  const handleRowClick = (row: any) => {
    navigate(`/user/${row.id}/posts`);
  };

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
      onRowClick={handleRowClick}
    />
  );
}
