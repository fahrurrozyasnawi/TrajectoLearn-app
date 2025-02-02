import HStack from '@components/stack view/HStack';
import {ThemeContext} from '@context/Theme';
import {getHeaderTitle} from '@react-navigation/elements';
import {StackHeaderProps} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, IconButton, Switch, Text, useTheme} from 'react-native-paper';

export default function Header(props: StackHeaderProps) {
  const {toggleTheme, isDark} = useContext(ThemeContext);
  const theme = useTheme();

  const title = getHeaderTitle(props.options, props.route.name);

  const showInfoBtn = title === 'Home';

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}>
      {props.back && (
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
      )}

      <Appbar.Content title={title} />

      <HStack style={styles.layoutSwitch}>
        {showInfoBtn && (
          <IconButton
            icon="information-outline"
            onPress={() => props.navigation.navigate('About')}
          />
        )}
        <Text>Dark</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </HStack>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  layoutSwitch: {
    alignItems: 'center',
  },
});
