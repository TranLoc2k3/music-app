import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground as RNImageBackground,
  ScrollView,
} from "react-native";
import { ImageBackground } from "../components/ImageBackground";
import { SongList } from "../components/SongList";
import colors from "../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";

const PlaylistData = {
  name: "R&B Playlist",
  description: "Chill your mind",
  image: "https://picsum.photos/200/200",
  songList: [
    {
      name: "You right",
      artist: "Doja Cat, The Weeknd",
      duration: "3:58",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "2 AM",
      artist: "Arizona Zervas",
      duration: "3:03",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Baddest",
      artist: "Chris Brown",
      duration: "3:51",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "True Love",
      artist: "Kanye West",
      duration: "4:52",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Bye Bye",
      artist: "Marshmello, Juice WRLD",
      duration: "2:09",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Hands on you",
      artist: "Austin George",
      duration: "3:56",
      image: "https://picsum.photos/200/200",
    },

    // New songs below
    {
      name: "Blinding Lights",
      artist: "The Weeknd",
      duration: "3:20",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Stay With Me",
      artist: "Calvin Harris, Justin Timberlake",
      duration: "3:41",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Kiss Me More",
      artist: "Doja Cat, SZA",
      duration: "3:28",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Leave The Door Open",
      artist: "Silk Sonic",
      duration: "4:02",
      image: "https://picsum.photos/200/200",
    },
  ],
};

export const PlayListScreen = ({ route, navigation }) => {
  const [playlistData, setPlaylistData] = useState(PlaylistData);

  const { playListId } = route.params || {};

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const response = await axios.get(`${API_URL}/collection/${playListId}`);
      setPlaylistData(response.data);
    }
    fetchPlaylistData();
  }, [playListId]);
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={{ uri: playlistData.image }}
          style={styles.headerBackground}
        >
          <View style={styles.overlay}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={24} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistName} numberOfLines={1}>
                {playlistData.name}
              </Text>
              <Text style={styles.playlistDescription} numberOfLines={2}>
                {PlaylistData.description}
              </Text>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity style={styles.heartButton}>
                <Icon name="heart-outline" size={24} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.playButton}>
                <Icon name="play" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bodyPlayList}>
        <SongList songList={playlistData.songs} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    width: "100%",
    height: 300,
  },
  headerBackground: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  playlistInfo: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  playlistName: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  playlistDescription: {
    color: colors.white,
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  heartButton: {
    marginRight: 20,
  },
  playButton: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyPlayList: {
    height: 500,
    paddingHorizontal: 20,
  },
});

export default PlayListScreen;
