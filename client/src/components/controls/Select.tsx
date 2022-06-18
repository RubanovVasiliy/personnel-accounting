import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';

interface PropsType {
    name: string;
    label: string;
    value: string;
    onChange: any;
    options: any;
    disabled?: boolean;
    error: any;
}

export default function Select(props: PropsType) {
    const {name, label, value, onChange, options, error = null } = props;

  return (
    <FormControl variant='outlined'>
        <InputLabel>{label}</InputLabel>  
        <MuiSelect
            label={label} 
            name={name}
            value={value}
            onChange={onChange}
        >
            {options.map((item: any) => (
                    <MenuItem 
                        key={item.id} 
                        value={item.id}
                    >
                        {item.title}
                    </MenuItem>
            ))}
        </MuiSelect>   
        {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
