import { TextField, TextFieldProps } from '@mui/material';
import { useController } from 'react-hook-form';

export const TextInput = ({
  name,
  children,
  ...props
}: Omit<TextFieldProps, 'name'> & { name: string }) => {
  const { field, fieldState } = useController({ name, defaultValue: '' });

  return (
    <TextField
      {...field}
      {...props}
      error={!!fieldState.error}
      helperText={!!fieldState.error ? fieldState.error.message : ''}
    >
      {children}
    </TextField>
  );
};
