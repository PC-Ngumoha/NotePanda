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

type ThemedButtonPropType = PressableProps & { style?: StyleProp<ViewStyle> };

const ThemedButton = ({ style, children, ...props }: ThemedButtonPropType) => {
  const colorScheme = useColorScheme()!;
  const theme = Colors[colorScheme] ?? Colors.light;

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
