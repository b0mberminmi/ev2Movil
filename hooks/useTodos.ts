import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Datos de la nueva tarea a crear
export interface Todo {
  id: string;
  title: string;
  photoUri: string;
  latitude: number;
  longitude: number;
  isCompleted: boolean;
  userEmail: string;
}

const TODOS_STORAGE_KEY_PREFIX = '@MyApp:Todos';
const getStorageKey = (email: string) =>
  `${TODOS_STORAGE_KEY_PREFIX}:${email.trim().toLowerCase() || 'anon'}`;

const useTodos = (currentEmail: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const storageKey = useMemo(() => getStorageKey(currentEmail), [currentEmail]);

  // Cargar tareas desde AsyncStorage
  const loadTodos = useCallback(async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(storageKey);
      const parsed: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
      if (isMountedRef.current) {
        setTodos(parsed);
      }
    } catch (error) {
      console.error('Error al cargar tareas: ', error);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    setIsLoading(true);
    loadTodos();
  }, [loadTodos]);

  // Función pública para recargar
  const reload = useCallback(() => {
    setIsLoading(true);
    loadTodos();
  }, [loadTodos]);

  // Persistencia
  const persistTodos = useCallback(
    async (nextTodos: Todo[]) => {
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(nextTodos));
      } catch (error) {
        console.error('Error al guardar tareas: ', error);
      }
    },
    [storageKey]
  );

  // Funciones crud

  const createTodo = useCallback(
    async (
      title: string,
      photoUri: string,
      location: Location.LocationObjectCoords
    ) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        photoUri,
        latitude: location.latitude,
        longitude: location.longitude,
        isCompleted: false,
        userEmail: currentEmail,
      };

      let updatedTodos: Todo[] = [];
      setTodos(prevTodos => {
        updatedTodos = [...prevTodos, newTodo];
        return updatedTodos;
      });
      await persistTodos(updatedTodos);
    },
    [currentEmail, persistTodos]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      let updatedTodos: Todo[] = [];
      setTodos(prevTodos => {
        updatedTodos = prevTodos.filter(todo => todo.id !== id);
        return updatedTodos;
      });
      await persistTodos(updatedTodos);
    },
    [persistTodos]
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      let updatedTodos: Todo[] = [];
      setTodos(prevTodos => {
        updatedTodos = prevTodos.map(todo =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        return updatedTodos;
      });
      await persistTodos(updatedTodos);
    },
    [persistTodos]
  );

  return {
    todos,
    isLoading,
    createTodo,
    deleteTodo,
    toggleTodo,
    reload,
  };
};

export default useTodos;