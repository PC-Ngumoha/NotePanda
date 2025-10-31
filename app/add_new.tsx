import React from 'react';
import { StyleSheet } from 'react-native';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

const AddNote = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>AddNewNote</ThemedText>
    </ThemedView>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
