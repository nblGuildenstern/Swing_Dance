import { Stack } from 'expo-router';
import { FavoritesProvider } from './context/FavoritesContext';


export default function Layout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Swing Dance Tutor' }} />
        <Stack.Screen name="move_list" options={{ title: 'Swing Dance Moves' }} />
      </Stack>
    </FavoritesProvider>
  );
}