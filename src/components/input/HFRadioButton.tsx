import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {View, ViewStyle} from 'react-native';
import {
  HelperText,
  RadioButton,
  RadioButtonGroupProps,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native-paper';

type Options = {
  label: string;
  value: string;
};

type HFRadioButtonType<T extends FieldValues> = {
  control: Control<T, object>;
  name: Path<T>;
  label: string;
  options: Options[];
};

const HFRadioButton = <T extends FieldValues>({
  control,
  name,
  label,
  options,
}: HFRadioButtonType<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View>
          <Text variant="titleMedium">{label}</Text>
          <RadioButton.Group onValueChange={onChange} value={value}>
            {options.map(item => (
              <RadioButton.Item
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </RadioButton.Group>
          <HelperText type="error" visible={!!error}>
            {error?.message}
          </HelperText>
        </View>
      )}
    />
  );
};

export default HFRadioButton;
