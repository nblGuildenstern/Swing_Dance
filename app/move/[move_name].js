import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import moveInfo from '../../assets/moveInfo.json';
import DancePlayer from '../components/DancePlayer';
import { useFavorites } from '../context/FavoritesContext';


export default function Move() {
  const { move_name } = useLocalSearchParams();
  const move = moveInfo.moves[move_name];
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorited = isFavorite(move_name)

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: move?.name || 'Move' ,
          headerRight: () => (
            <Pressable onPress={() => toggleFavorite(move_name)}>
              <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={22} />
            </Pressable>
          )
        }}
      />

      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* Dance animation - fixed height or proportional */}
        <View style={{ flex: 3}}>
          <DancePlayer clip={move.clip} />
        </View>

        {/* Move info */}
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          {move ? (
            <>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{move.name}</Text>
              <Text style={{ marginTop: 10 }}>Difficulty: {move.difficulty}</Text>
            </>
          ) : (
            <Text>Move not found</Text>
          )}
        </View>
      </View>
    </>
  );
}