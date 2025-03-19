import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type CustomTextFieldProps<T extends FieldValues> = TextFieldProps & {
 errorMessage?: string;
 name: Path<T>;
 control:Control<T>;
 rules?:object;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "0.8",
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "1",
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[200],
  },
}));


const CustomTextField = <T extends FieldValues>({
  name,
  control,
  rules,
  errorMessage,
  ...props
}: CustomTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <StyledTextField
          {...props}
          helperText={errorMessage}
          error={Boolean(errorMessage)}
          {...field}
        />
      )}
    />
  );
};

export default CustomTextField;
