import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TodoForm from '../components/TodoForm';
import useTodos from '../hooks/useTodos';

const NEON_GREEN = '#00FF00';
const BLACK = 'black';

export default function ModalScreen() {
  const router = useRouter();
  const { userEmail } = useLocalSearchParams<{ userEmail?: string }>();

  const emailString = userEmail ? String(userEmail) : '';

  const { createTodo } = useTodos(emailString);

  const handleCreateFromModal = async (
    title: string,
    uri: string,
    coords: Location.LocationObjectCoords
  ) => {
    await createTodo(title, uri, coords);
    router.back(); // cerramos modal
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <Text style={styles.closeText}>Cerrar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Crear nueva tarea</Text>

      <TodoForm onCreateTodo={handleCreateFromModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeText: {
    color: NEON_GREEN,
    fontSize: 16,
  },
  title: {
    color: NEON_GREEN,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});