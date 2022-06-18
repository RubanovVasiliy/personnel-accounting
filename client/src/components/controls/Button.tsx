import { Button as MuiButton } from '@mui/material'
import { makeStyles } from '../../makesStyles';


const useStyles = makeStyles<{}>({ name: { Button } })(() => ({
    root: {
        '&  .MuiButton-root': {
            margin:'10px'
        }
    },
  }));

export default function Button(props: any) {
    const {text, size, color, variant, onChange, ...other} = props;
    const { classes } = useStyles({});

  return (
    <MuiButton
        variant={variant || "contained"}
        size={size || "large"}
        color={color || "primary"}
        onChange={onChange}
        {...other}
        classes={{root: classes.root }}
    >
        {text}
    </MuiButton>
  )
}
