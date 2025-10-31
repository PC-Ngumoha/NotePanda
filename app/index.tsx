import RoundHoverButton from '@/components/ui/RoundHoverButton';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

const Home = () => {
  const router = useRouter();

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Home</ThemedText>
        <Link style={styles.link} href="/details">
          <ThemedText>Details</ThemedText>
        </Link>
      </ThemedView>

      {/* Hover button appears at the bottom right */}
      <RoundHoverButton onPress={() => router.push('/add_new')}>
        <Feather name="plus" size={28} color="#fff" />
      </RoundHoverButton>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
