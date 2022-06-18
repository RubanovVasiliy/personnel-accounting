import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface IPropsType {
  name: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
}

export default function DatePicker(props: IPropsType) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name: string, value: string | null) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={label}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        inputFormat="yyyy/MM/dd"
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
