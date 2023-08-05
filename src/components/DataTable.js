import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuid } from 'uuid';
import '../styles/components/DataTable.css';
// define the data and table header mapping
const columns = [
  { field: 'Reference', headerName: 'Reference', width: 100 },
  { field: 'Account Number', headerName: 'Account Number', width: 180 },
  { field: 'Description', headerName: 'Description', width: 250 },
  {
    field: 'Mutation',
    headerName: 'Mutation',
    width: 110,
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
    <div className='div'>
      {props?.data?.length > 0 ? <DataGrid getRowId={(row) => uuid()}
        rows={props.data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        pageSizeOptions={[4, 10]}
        checkboxSelection
      /> : null}
    </div>
  );
}