import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SongItem } from './SongItem';
export const SongList = ({songList}) => {
  return (
    <View style={styles.container}>
        <FlatList 
            data={songList}
            renderItem={({item}) => <SongItem song={item}/>}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
        />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    }
})