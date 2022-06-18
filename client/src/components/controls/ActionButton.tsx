import { Button } from '@mui/material';
import React from 'react';
import { makeStyles } from '../../makesStyles';


const useStyles = makeStyles<{}>({ name: { ActionButton } })((theme) => ({
    root: {
    minWidth: 0,
    margin: "3px",
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main,
    },
  },
}));

interface IPropsType {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ActionButton(props: IPropsType) {
  const { children, onClick } = props;
  const { classes } = useStyles({});

  return (
    <Button className={`${classes.root} ${classes.primary}`} onClick={onClick}>
      {children}
    </Button>
  );
}
