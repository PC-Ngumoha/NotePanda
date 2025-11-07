import Spacer from '@/components/Spacer';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { INote } from '@/constants/types';
import { useNote } from '@/hooks/use-note';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

const NoteDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [note, setNote] = useState<INote>();
  const { getNote, deleteNote } = useNote();

  const handleDelete = async () => {
    await deleteNote(id as string);
    router.back();
  };

  useEffect(() => {
    async function setup() {
      const foundNote = await getNote(id as string);
      setNote(foundNote);
    }

    setup();
  }, []);

  if (!note) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{note.title}</ThemedText>
      <Spacer />
      <ThemedText style={styles.text}>{note.body}</ThemedText>
      <Spacer height={100} />
      <ThemedButton style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Edit Note</Text>
      </ThemedButton>
      <Spacer height={10} />
      <ThemedButton style={styles.button} danger={true} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Note</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 22,
    letterSpacing: 0.9,
    marginBottom: 3,
  },

  text: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    letterSpacing: 0.3,
  },

  button: {
    width: '100%',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1.2,
    fontSize: 17,
  },
});
