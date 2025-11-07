import { Colors } from '@/constants/colors';
import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
  useColorScheme,
} from 'react-native';

type ThemedButtonPropType = PressableProps & { style?: StyleProp<ViewStyle>; danger?: boolean };

const ThemedButton = ({ style, children, danger, ...props }: ThemedButtonPropType) => {
  const colorScheme = useColorScheme()!;
  const theme = Colors[colorScheme] ?? Colors.light;

  if (danger) {
    return (
      <Pressable
        style={[
          {
            backgroundColor: Colors.danger,
            padding: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[
        {
          backgroundColor: theme.uiBackground,
          padding: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({});
