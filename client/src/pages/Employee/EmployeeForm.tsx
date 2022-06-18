import { Grid } from '@mui/material';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import { GenderType } from '../../models/IGenderType';
import { IEmployee } from '../../models/IEmployee';
import { useEffect } from 'react';
import { makeStyles } from '../../makesStyles';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const useStyles = makeStyles<{}>({ name: { EmployeeForm } })(() => ({
  buttons: {
    margin: 'auto',
  },
  button: {
    '& MuiButton-root': {
      margin: '3px',
    },
  },
}));

const genderItems: GenderType[] = [
  { id: '1', title: 'Мужчина' },
  { id: '2', title: 'Женщина' },
  { id: '3', title: 'Другое' },
];

const initialValues: IEmployee = {
  id: 'null',
  firstname: '',
  lastname: '',
  patronymic: '',
  email: '',
  birthday: '2022/06/30',
  gender: 'Мужчина',
  postId: '1',
  postTypeId: '1',
};

export default function EmployeeForm(props: any) {
  const { posts } = useTypedSelector((store) => store.posts);
  const { classes } = useStyles({});
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors };
    if ('firstname' in fieldValues)
      temp.firstname = fieldValues.firstname ? '' : 'Необходима заполнить поле';
    if ('lastname' in fieldValues)
      temp.lastname = fieldValues.lastname ? '' : 'Необходима заполнить поле';
    if ('patronymic' in fieldValues)
      temp.patronymic = fieldValues.patronymic
        ? ''
        : 'Необходима заполнить поле';
    if ('email' in fieldValues)
      temp.email =
        fieldValues.email && /$^|.+@.+..+/.test(values.email)
          ? ''
          : 'Необходима корректно заполнить поле';
    if ('postId' in fieldValues)
      temp.postId =
        fieldValues.birthday &&
        /$^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])*/.test(
          values.birthday
        )
          ? ''
          : 'Необходима заполнить поле';
    if ('postId' in fieldValues)
      temp.postId = fieldValues.postId ? '' : 'Необходима заполнить поле';
    if ('postTypeId' in fieldValues)
      temp.postTypeId = fieldValues.postTypeId
        ? ''
        : 'Необходима заполнить поле';
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialValues, true, validate);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              label="Фамилия"
              name="firstname"
              value={values.firstname}
              onChange={handleInputChange}
              error={errors.firstname}
            />
            <Controls.Input
              label="Имя"
              name="lastname"
              value={values.lastname}
              onChange={handleInputChange}
              error={errors.lastname}
            />
            <Controls.Input
              label="Отчество"
              name="patronymic"
              value={values.patronymic}
              onChange={handleInputChange}
              error={errors.patronymic}
            />
            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Select
              name="postId"
              label="Должность"
              value={values.postId}
              onChange={(e: any) =>
                setValues({
                  ...values,
                  postId: e.target.value,
                  postTypeId: '1',
                })
              }
              options={posts}
              error={errors.postId}
            />
            <Controls.Select
              name="postTypeId"
              label="Подразделение"
              value={values.postTypeId}
              onChange={handleInputChange}
              options={posts[parseInt(values.postId) - 1].types}
              error={errors.postTypeId}
            />
            <Controls.DataPicker
              name="birthday"
              label="День рождения"
              value={values.birthday}
              onChange={handleInputChange}
            />
            <Controls.RadioGroup
              name="gender"
              label="Пол"
              value={values.gender}
              onChange={handleInputChange}
              items={genderItems}
            />
          </Grid>
          <div className={classes.buttons}>
            <Controls.Button
              classes={{ button: classes.button }}
              text="Добавить"
              type="submit"
            />
            <Controls.Button
              text="Очистить"
              color="inherit"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Form>
    </>
  );
}
