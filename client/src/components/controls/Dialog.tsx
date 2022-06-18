import React from 'react';
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { makeStyles } from '../../makesStyles';
import Controls from './Controls';

const useStyles = makeStyles<{}>({ name: { Dialog } })(() => ({
  dialogWrapper: {
    padding: '8px',
  },
  dialogTitle: {
    paddingRight: '0px',
  },
  title: {
    display: 'flex',
  },
  typography: {
    flexGrow: '1',
  },
}));

interface IPropsType {
  title: string;
  openDialog: any;
  setOpenDialog: any;
  children: React.ReactNode;
}

export default function Dialog(props: IPropsType) {
  const { title, openDialog, setOpenDialog, children } = props;
  const { classes } = useStyles({});

  return (
    <MuiDialog
      maxWidth="md"
      open={openDialog}
      className={classes.dialogWrapper}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div className={classes.title}>
          <Typography
            variant="h6"
            component="div"
            className={classes.typography}
          >
            {title}
          </Typography>
          <Controls.Button
            color="error"
            text="X"
            onClick={() => setOpenDialog(false)}
          />
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </MuiDialog>
  );
}
