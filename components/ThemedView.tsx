import { Colors } from '@/constants/colors';
import React, { ReactNode } from 'react';
import { StyleProp, useColorScheme, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ThemedView = ({
  children,
  safe = false,
  style,
  ...props
}: {
  children: ReactNode;
  safe?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const colorScheme = useColorScheme()!;
  const theme = Colors[colorScheme] ?? Colors.light;
  const insets = useSafeAreaInsets();

  if (!safe)
    return (
      <View
        style={[
          {
            backgroundColor: theme.background,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemedView;
