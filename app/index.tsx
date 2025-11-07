import RoundHoverButton from '@/components/ui/RoundHoverButton';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import ThemedView from '@/components/ThemedView';
import NoteCard from '@/components/ui/NoteCard';
import { INote } from '@/constants/types';
import { useNote } from '@/hooks/use-note';

const Home = () => {
  const router = useRouter();
  // const pathname = usePathname();
  const { listNotes, refreshKey } = useNote();
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    async function setup() {
      const allNotes = await listNotes();
      // console.log(notes);
      setNotes(allNotes);
    }

    setup();
  }, [refreshKey]);

  return (
    <>
      <ThemedView style={styles.container}>
        {/* <ThemedText style={styles.title}>Home</ThemedText>
        <Link style={styles.link} href="/details">
          <ThemedText>Details</ThemedText>
        </Link> */}
        <FlatList
          style={styles.cardList}
          data={notes}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push({ pathname: '/note/[id]', params: { id: item.id } })}
            >
              <NoteCard style={styles.card} element={item} />
            </Pressable>
          )}
        />
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

  cardList: {
    width: '100%',
    // alignItems: 'center',
  },

  card: {
    width: '80%',
    alignSelf: 'center',
  },
});
