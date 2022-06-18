import {
  Box,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Controls from '../../components/controls/Controls';
import useTable from '../../components/useTable';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { makeStyles } from '../../makesStyles';
import EmployeeForm from './EmployeeForm';
import EditIcon from '@mui/icons-material/Edit';
import { IEmployee } from '../../models/IEmployee';
import { v4 } from 'uuid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { IHeadCells } from '../../models/IHeadCells';

const useStyles = makeStyles<{}>({ name: { EmployeeForm } })(() => ({
  pageContent: {
    margin: '5px',
    padding: '3px',
    width: '100%',
  },
  selectPost: {
    minWidth: '250px',
    margin: '10px',
  },
  selectPostType: {
    minWidth: '250px',
    margin: '10px',
  },
}));

const headCells: IHeadCells[] = [
  { id: 'firstname', label: 'Фамилия', disableSorting: false },
  { id: 'lastname', label: 'Имя', disableSorting: false },
  { id: 'patronymic', label: 'Отчество', disableSorting: false },
  { id: 'email', label: 'Email', disableSorting: true },
  { id: 'birthday', label: 'Дата рождения', disableSorting: false },
  { id: 'gender', label: 'Пол', disableSorting: false },
  { id: 'postId', label: 'Должность', disableSorting: true },
  { id: 'postTypeId', label: 'Подразделение', disableSorting: true },
  { id: 'edit', label: 'Изменить', disableSorting: true },
];

export default function Employees() {
  const { classes } = useStyles({});
  const {
    loadEmployees,
    loadPosts,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useActions();
  const { employees, loadingEmployees } = useTypedSelector(
    (store) => store.employees
  );
  const { posts, loadingPosts } = useTypedSelector((store) => store.posts);
  const [openDialog, setOpenDialog] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState<IEmployee | null>(null);
  const [selectedPostId, setSelectedPostId] = useState('all');
  const [selectedPostTypeId, setSelectedPostTypeId] = useState('all');
  const [filterPosts, setFilterPosts] = useState({
    filter: (items: IEmployee[]) => {
      return items;
    },
  });

  useEffect(() => {
    const handleFilterPost = () => {
      setFilterPosts({
        filter: (employees: IEmployee[]) => {
          if (selectedPostId === 'all') return employees;

          if (selectedPostTypeId === 'all')
            return employees.filter(
              (employee: IEmployee) => employee.postId === selectedPostId
            );
          return employees.filter(
            (employee: IEmployee) =>
              employee.postId === selectedPostId &&
              employee.postTypeId === selectedPostTypeId
          );
        },
      });
    };

    handleFilterPost();
  }, [selectedPostId, selectedPostTypeId]);

  useEffect(() => {
    loadEmployees();
    loadPosts();
  }, []);

  const {
    TableContainer,
    TableContainerHead,
    TableContainerPagination,
    recordsAfterPagingAndSorting,
  } = useTable(employees, headCells, filterPosts);

  const addOrEdit = (employee: IEmployee, resetForm: any) => {
    if (employee.id === 'null') {
      employee.id = v4();
      createEmployee(employee);
    } else {
      updateEmployee(employee);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenDialog(false);
  };

  const openInPopup = (item: IEmployee | null) => {
    setRecordForEdit(item);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ mb: 2 }}>
        {!loadingEmployees && !loadingPosts && (
          <>
            <div>
              <Tooltip title="Должность">
                <Select
                  size="small"
                  className={classes.selectPost}
                  value={selectedPostId}
                  onChange={(e: any) => {
                    setSelectedPostId(e.target.value);
                    setSelectedPostTypeId('all');
                  }}
                >
                  <MenuItem value={'all'}>Все</MenuItem>
                  {posts.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
              <Tooltip title="Подразделение">
                <Select
                  disabled={selectedPostId === 'all' ? true : false}
                  size="small"
                  className={classes.selectPostType}
                  value={selectedPostTypeId}
                  onChange={(e: any) => {
                    setSelectedPostTypeId(e.target.value);
                  }}
                >
                  <MenuItem value={'all'}>Все</MenuItem>
                  {selectedPostId !== 'all' &&
                    posts[parseInt(selectedPostId) - 1].types.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
              </Tooltip>
            </div>
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              }}
            >
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Персонал
              </Typography>
              <Tooltip title="Добавить">
                <IconButton
                  onClick={() => {
                    setOpenDialog(true);
                    setRecordForEdit(null);
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <TableContainer>
              <TableContainerHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.firstname}</TableCell>
                    <TableCell>{item.lastname}</TableCell>
                    <TableCell>{item.patronymic}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.birthday}</TableCell>
                    <TableCell>{item.gender}</TableCell>
                    <TableCell>
                      {posts[parseInt(item.postId) - 1].title}
                    </TableCell>
                    <TableCell>
                      {
                        posts[parseInt(item.postId) - 1].types[
                          parseInt(item.postTypeId) - 1
                        ].title
                      }
                    </TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        onClick={() => {
                          openInPopup(item);
                        }}
                      >
                        <EditIcon color="action" fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        onClick={() => {
                          deleteEmployee(item.id);
                        }}
                      >
                        <DeleteIcon color="action" fontSize="small" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
            <TableContainerPagination />{' '}
          </>
        )}
      </Paper>
      <Controls.Dialog
        title="Добавить сотрудника"
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      >
        <EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </Controls.Dialog>
    </Box>
  );
}
