import { TextField } from '@mui/material'

interface PropsType {
    name: string;
    label: string;
    value: string;
    onChange: any;
    error: any;
}

export default function Input(props: PropsType) {
    const {name, label, value, onChange, error = null} = props;
  return (
    <TextField 
        variant="outlined" 
        label={label} 
        name={name}
        value={value}
        onChange={onChange}
        { ...(error && {error: true, helperText: error})}
    />
  )
}
