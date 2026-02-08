import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Button, Image, Pressable, View } from 'react-native';


export default function Home() {
const moveID = "cuddle";
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => router.push('/settings')}>
              <Ionicons name="settings-outline" size={22} />
            </Pressable>
          ),
        }}
      />
      
      <View style={{flex:1,alignItems:'center',justifyContent:'center', padding:16}}>
        <Image source={require('../assets/images/icon.png')} style={{ width: 220, height: 220, margin:20 }} />
        <Button title="Go to list" onPress={() => router.push('/move_list')} />
      </View>
    </>
  );
}
