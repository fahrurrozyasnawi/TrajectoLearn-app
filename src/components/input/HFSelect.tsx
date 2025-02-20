import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {View, ViewStyle} from 'react-native';
import {Dropdown, DropdownProps} from 'react-native-paper-dropdown';
import {HelperText, TextInput, TextInputProps} from 'react-native-paper';

type Options = {
  label: string;
  value: string | number;
};

type HFSelectType<T extends FieldValues> = DropdownProps & {
  control: Control<T, object>;
  name: Path<T>;
  options: Options[];
  style?: ViewStyle;
};

const HFSelect = <T extends FieldValues>({
  control,
  name,
  options,
  style,
  ...rest
}: HFSelectType<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View>
          <Dropdown
            mode="outlined"
            value={value}
            options={options}
            error={!!error}
            onSelect={onChange}
            {...rest}
          />
          <HelperText type="error" visible={!!error}>
            {error?.message}
          </HelperText>
        </View>
      )}
    />
  );
};

export default HFSelect;
