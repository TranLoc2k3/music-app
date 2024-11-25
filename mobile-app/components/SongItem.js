import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

// {
//     "name": "id 072019",
//     "artist": "W/n",
//     "duration": "04:12",
//     "image": "https://i.ytimg.com/vi/kfw7MYah2n0/maxresdefault.jpg",
//     "url": "https://thuanhighclean.s3.ap-southeast-1.amazonaws.com/thienlyoi.mp3"
//   },
export const SongItem = ({ song }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("NowPlayingScreen", { song: song });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: song.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{song.name}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>
      <Text style={styles.duration}>{song.duration}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  artist: {
    color: colors.secondary_text,
    fontSize: 14,
    marginTop: 4,
  },
  duration: {
    color: colors.secondary_text,
    fontSize: 14,
  },
});
