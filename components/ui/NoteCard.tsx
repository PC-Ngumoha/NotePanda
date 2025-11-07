import { Colors } from '@/constants/colors';
import { INote } from '@/constants/types';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import ThemedView from '../ThemedView';

const NoteCard = ({
  element,
  style,
  ...props
}: {
  element: INote;
  style: StyleProp<ViewStyle>;
}) => {
  const colorScheme = useColorScheme()!;
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <ThemedView
      style={[{ borderColor: theme.tint, borderWidth: 0.6 }, styles.container, style]}
      {...props}
    >
      <View style={styles.infoSection}>
        <Text style={styles.title}>{element.title}</Text>
        <Text style={[{ color: theme.text }, styles.text]}>{element.body}</Text>
      </View>
      <Pressable style={styles.deleteSection}>
        <Feather name="trash-2" size={20} color={theme.uiBackground} />
      </Pressable>
    </ThemedView>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 'auto',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
  },

  infoSection: {
    flex: 5,
  },

  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    letterSpacing: 0.5,
    marginBottom: 3,
  },

  text: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    letterSpacing: 0.3,
  },

  deleteSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
