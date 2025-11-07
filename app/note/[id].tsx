import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NoteDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>NoteDetails: {id}</Text>
    </View>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({});
