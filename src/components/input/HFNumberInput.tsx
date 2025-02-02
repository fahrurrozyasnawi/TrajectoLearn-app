import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {View, ViewStyle} from 'react-native';
import {HelperText, TextInput, TextInputProps} from 'react-native-paper';

type HFNumberInputType<T extends FieldValues> = TextInputProps & {
  control: Control<T, object>;
  name: Path<T>;
  style?: ViewStyle;
};

const HFNumberInput = <T extends FieldValues>({
  control,
  name,
  style,
  ...rest
}: HFNumberInputType<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        pattern: /^[0-9]+$/,
      }}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View>
          <TextInput
            keyboardType="numeric"
            mode="outlined"
            style={style}
            onBlur={onBlur}
            onChangeText={text => onChange(Number(text))}
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

export default HFNumberInput;
