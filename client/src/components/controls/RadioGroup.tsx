import { 
    FormControl,
    FormLabel,
    RadioGroup as MuiRadioGroup,
    FormControlLabel, 
    Radio } from '@mui/material';

interface PropsType {
    name: string;
    label: string;
    value: string;
    onChange: any;
    items: any;
}    

export default function RadioGroup(props: PropsType) {
  const { name, label, value, onChange, items } = props;

  return (
    <FormControl>
        <FormLabel>{label}</FormLabel>
        <MuiRadioGroup row name={name} value={value} onChange={onChange}>
            {items.map((item: any) => (
                <FormControlLabel
                    key={item.id}
                    value={item.title}
                    control={<Radio />}
                    label={item.title}
                />
            ))}
        </MuiRadioGroup>
    </FormControl>
  );
}
