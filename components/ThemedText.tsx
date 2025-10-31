import { Colors } from '@/constants/colors';
import React, { ReactNode } from 'react';
import { StyleProp, Text, TextStyle, useColorScheme } from 'react-native';

const ThemedText = ({
  children,
  style,
  ...props
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) => {
  const colorScheme = useColorScheme()!;
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Text style={[{ color: theme.text }, style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
