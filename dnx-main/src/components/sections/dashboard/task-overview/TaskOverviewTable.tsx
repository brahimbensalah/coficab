import { useEffect } from 'react';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { rows } from 'data/taskOverview';
// import ActionMenu from './ActionMenu';

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'id',
    headerName: 'ID',
    editable: false,
    align: 'left',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'name',
    headerName: 'Users',
    editable: false,
    sortable: false,
    align: 'left',
    flex: 2,
    minWidth: 140,
   
  },
  {
    field: 'progress',
    headerName: 'PAGE',
    editable: false,
    align: 'left',
    flex: 1,
    minWidth: 200,   
  },
  {
    field: 'status',
    headerName: 'Status',
    // headerAlign: 'center',
    editable: false,
    flex: 0,
    minWidth: 140,
    // renderCell: (params) => {
    //   const color =
    //     params.value === 'in progress'
    //       ? 'primary'
    //       : params.value === 'completed'
    //         ? 'success'
    //         : params.value === 'pending'
    //           ? 'warning'
    //           : 'info';
    //   return (
    //     <Stack direction="column" alignItems="center" justifyContent="center" height={1}>
    //       <Chip label={params.value} size="small" color={color} />
    //     </Stack>
    //   );
    // },
  },
  {
    field: 'DATE',
    headerName: 'DATE',
    headerAlign: 'right',
    align: 'right',
    editable: false,
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'TIME',
    headerName: 'TIME',
    headerAlign: 'right',
    align: 'right',
    editable: false,
    flex: 1,
    minWidth: 100,
  },
 
];

interface TaskOverviewTableProps {
  searchText: string;
}

const TaskOverviewTable = ({ searchText }: TaskOverviewTableProps) => {
  const apiRef = useGridApiRef<GridApi>();

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  return (
    <DataGrid
      apiRef={apiRef}
      density="standard"
      columns={columns}
      rows={rows}
      rowHeight={60}
      disableColumnResize
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      autosizeOptions={{
        includeOutliers: true,
        includeHeaders: false,
        outliersFactor: 1,
        expand: true,
      }}
      slots={{
        pagination: DataGridFooter,
      }}
      checkboxSelection
      pageSizeOptions={[5]}
    />
  );
};

export default TaskOverviewTable;
