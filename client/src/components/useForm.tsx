import { useState } from 'react';
import { makeStyles } from '../makesStyles';
import { IEmployee } from '../models/IEmployee';

const useStyles = makeStyles<{}>({ name: { Form } })((theme) => ({
  root: {
    '&  .MuiFormControl-root': {
      width: '80%',
      margin: '10px',
    },
  },
}));

export function useForm(
  initialValues: IEmployee,
  validateOnChange = false,
  validate: any
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({} as any);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

export function Form(props: any) {
  const { classes } = useStyles({});
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
