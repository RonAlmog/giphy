import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.text}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size={"small"}>
      {/* <InputLabel>{label}</InputLabel> */}
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
