import { Colors } from '@/constants/colors';
import React from 'react';
import {
  // StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

const RoundHoverButton = ({ ...props }) => {
  const colorScheme = useColorScheme()!;
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.uiBackground,
        borderColor: theme.uiBackground,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '6%',
        right: '5%',
      }}
      {...props}
    />
  );
};

export default RoundHoverButton;

// const styles = StyleSheet.create({});
