import {
  TableContainer as MuiTableContainer,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '../makesStyles';

const useStyles = makeStyles<{}>({ name: { useTable } })((theme: any) => ({
  table: {
    '& thead th': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody tr:hover': {
      backgroundColor: '#f2f2f2',
      cursor: 'pointer',
    },
  },
}));

export default function useTable(
  records: any[],
  headCells: any,
  filterPosts: any
) {
  const { classes } = useStyles({});

  const pages: number[] = [5, 10, 25];
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('firstname');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const TableContainer = (props: any) => (
    <MuiTableContainer>
      <Table className={classes.table}>{props.children}</Table>
    </MuiTableContainer>
  );

  const TableContainerHead = () => {
    const handleSortRequest = (cellId: string) => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell: any) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TableContainerPagination = () => (
    <TablePagination
      rowsPerPageOptions={pages}
      component="div"
      count={records.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = 'asc' | 'desc';

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      filterPosts.filter(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TableContainer,
    TableContainerHead,
    TableContainerPagination,
    recordsAfterPagingAndSorting,
  };
}
