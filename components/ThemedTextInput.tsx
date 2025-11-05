import { Colors } from '@/constants/colors';
import { TextInput, TextInputProps, useColorScheme } from 'react-native';

const ThemedTextInput = ({ style, ...props }: TextInputProps) => {
  const colorScheme = useColorScheme()!;
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <TextInput
      style={[
        {
          borderWidth: 1,
          borderColor: theme.tint,
          borderRadius: 5,
          padding: 10,
          textAlignVertical: 'top',
          letterSpacing: 0.8,
          color: theme.text,
        },
        style,
      ]}
      placeholderTextColor={theme.tint}
      {...props}
    />
  );
};

export default ThemedTextInput;
