import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/colors';
import { NoteProvider } from '@/context/note-context';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Outfit_700Bold, useFonts } from '@expo-google-fonts/outfit';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';

const RootLayout = () => {
  const colorScheme = useColorScheme()!;
  const theme = Colors[colorScheme] ?? Colors.light;

  const [fontsLoaded] = useFonts({
    Outfit_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  // Will cause navigation bar U.I to match app U.I
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.background);
  }, [theme.background]);

  if (!fontsLoaded) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={theme.text} />
      </ThemedView>
    );
  }

  return (
    <NoteProvider>
      <ThemedView safe={true} style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTintColor: theme.text,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Outfit_700Bold',
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" options={{ title: 'NotePanda', headerShown: false }} />
          <Stack.Screen name="add_new" options={{ title: 'Add Note', headerShown: true }} />
          <Stack.Screen name="note/[id]" options={{ title: 'Note Details', headerShown: true }} />
        </Stack>
      </ThemedView>
    </NoteProvider>
  );
};

export default RootLayout;
