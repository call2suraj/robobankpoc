import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuid } from 'uuid';

// define the data and table header mapping
const columns = [
  { field: 'Reference', headerName: 'Reference', width: 100 },
  { field: 'Account Number', headerName: 'Account Number', width: 180 },
  { field: 'Description', headerName: 'Description', width: 250 },
  {
    field: 'Mutation',
    headerName: 'Mutation',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
  },
  {
    field: 'Start Balance',
    headerName: 'Start Balance',
    type: 'number',
    width: 140,
  },
  {
    field: 'End Balance',
    headerName: 'End Balance',
    type: 'number',
    width: 140,
  },
];


export default function DataTable(props) {
  return (
    <div style={{ height: 370, width: '100%' }}>
      {props?.data?.length > 0 ? <DataGrid getRowId={(row) => uuid()}
        rows={props.data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      /> : null}
    </div>
  );
}