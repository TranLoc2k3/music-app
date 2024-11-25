import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SongList } from "./SongList";
import colors from "../styles/colors";
export const Playlist = ({ playlist }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.namePlaylist}>{playlist.name}</Text>
      <SongList songList={playlist.songList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  namePlaylist: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: colors.primary_text,
    paddingVertical: 12,
  },
});
