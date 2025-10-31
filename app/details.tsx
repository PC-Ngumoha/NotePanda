import React from 'react';
import { StyleSheet } from 'react-native';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

const DetailsPage = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>DetailsPage</ThemedText>
    </ThemedView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
