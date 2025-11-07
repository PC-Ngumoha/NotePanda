import { Colors } from '@/constants/colors';
import { INote } from '@/constants/types';
import { useNote } from '@/hooks/use-note';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, useColorScheme, View, ViewStyle } from 'react-native';
import ThemedText from '../ThemedText';
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
  const { deleteNote } = useNote();

  const handleDelete = async () => {
    await deleteNote(element.id as string);
  };

  return (
    <ThemedView
      style={[{ borderColor: theme.tint, borderWidth: 0.6 }, styles.container, style]}
      {...props}
    >
      <View style={styles.infoSection}>
        <ThemedText style={styles.title}>{element.title}</ThemedText>
        <ThemedText style={styles.text}>
          {element.body.length > 100 ? element.body.substring(0, 100) + ' ...' : element.body}
        </ThemedText>
      </View>
      <Pressable style={styles.deleteSection} onPress={handleDelete}>
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
