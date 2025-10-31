// import { } from 'react-native'
// import React from 'react'
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    // <View>
    //   <Text>layout</Text>
    // </View>
    <Stack>
      <Stack.Screen name="index" options={{ title: 'NotePanda', headerShown: true }} />
    </Stack>
  );
};

export default RootLayout;
