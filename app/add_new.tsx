import Spacer from '@/components/Spacer';
import ThemedButton from '@/components/ThemedButton';
import ThemedTextInput from '@/components/ThemedTextInput';
import ThemedView from '@/components/ThemedView';
import { useNote } from '@/hooks/use-note';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';

const AddNote = () => {
  const { noteId } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // console.log(noteId);
  const { createNote, getNote, updateNote } = useNote();
  const router = useRouter();

  const handleSubmitNote = async () => {
    await createNote({ title, body });
    router.back();
  };

  const handleUpdateNote = async () => {
    await updateNote(noteId as string, { title, body });
    router.replace('/');
  };

  useEffect(() => {
    async function setup(id: string) {
      const note = await getNote(id);

      if (note) {
        setTitle(note.title);
        setBody(note.body);
      }
    }

    if (noteId) {
      setup(noteId as string);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedTextInput
          style={styles.input}
          placeholder="Note Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Spacer />
        <ThemedTextInput
          style={styles.multiline}
          placeholder="Write note here... "
          multiline={true}
          value={body}
          onChangeText={(text) => setBody(text)}
        />
        <Spacer height={20} />
        <ThemedButton style={styles.button} onPress={noteId ? handleUpdateNote : handleSubmitNote}>
          <Text style={styles.buttonText}>Save Note</Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 18,
  },

  multiline: {
    width: '100%',
    height: '80%',
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
