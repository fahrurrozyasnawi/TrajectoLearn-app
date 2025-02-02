import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {View, ViewStyle} from 'react-native';
import {HelperText, TextInput, TextInputProps} from 'react-native-paper';

type HFInputType<T extends FieldValues> = TextInputProps & {
  control: Control<T, object>;
  name: Path<T>;
  style?: ViewStyle;
};

const HFInput = <T extends FieldValues>({
  control,
  name,
  style,
  ...rest
}: HFInputType<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View>
          <TextInput
            mode="outlined"
            style={style}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!error}
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

export default HFInput;
