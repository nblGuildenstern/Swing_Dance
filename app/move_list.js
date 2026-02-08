import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import moveInfo from '../assets/moveInfo.json';

export default function MoveList() {
    const [showFilters, setFilterSettings] = useState(false);

    const moves = Object.entries(moveInfo.moves).map(
        ([id, data]) => ({
            id,
            ...data
        })
    );

    const styles = StyleSheet.create({
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modal: {
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 10,
            minWidth: 150,
            alignItems: 'center',
        },
    });
    return (
        <>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Pressable onPress={() => setFilterSettings(true)}>
                        <Ionicons name="menu" size={22} />
                        </Pressable>
                    ),
                }}
            />
            <View style={{flex:1, padding:20}}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{fontSize:25}}>Swing Dance Moves</Text>
                </View>

                
                <FlatList
                data={moves}
                numColumns={1}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={{flex:1, alignItems:'center'}} >
                        <Pressable onPress={() => router.push(`/move/${item.name.toLowerCase()}`)}>
                            <View style={{alignItems:'center', margin:5, padding:5, width:200, backgroundColor: '#ddd'
                                }}
                                >
                                <Text>{item.name}</Text>
                            </View>
                        </Pressable>
                    </View>
                )}
                style={{ marginTop: 20}}
                />
            
                {showFilters && (
                    <View style={styles.overlay}>
                        <View style={styles.modal}>
                        <Text>Filters</Text>
                        <Button title="Close" onPress={() => setFilterSettings(false)} />
                        </View>
                    </View>
                )}
            </View>
        </>
    )
}