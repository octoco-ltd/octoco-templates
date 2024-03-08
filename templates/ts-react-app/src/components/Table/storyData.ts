import { GridColDef, GridValueGetterParams, GridRowsProp } from '@mui/x-data-grid';

/**
 * Represents the columns configuration for the table.
 */
export const columns: GridColDef[] = [
    /**
     * Represents the ID column.
     */
    { field: 'id', headerName: 'ID', width: 90 },
    /**
     * Represents the First Name column.
     */
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    /**
     * Represents the Last Name column.
     */
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    /**
     * Represents the Age column.
     */
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    /**
     * Represents the Full Name column.
     * This column has a value getter and is not sortable.
     */
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

export const rows: GridRowsProp = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
