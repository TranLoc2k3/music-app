import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground as RNImageBackground,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import colors from "../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { CollectionPlaylist } from "../components/CollectionPlaylist";
import { Playlist } from "../components/Playlist";
import CategoryList from "../data/CategoryList";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { SongList } from "../components/SongList";


const CollectionPlaylistData = [
  {
    id: 1,
    name: "Playlist 1",
    image: "https://picsum.photos/200/300",
  },
  { id: 2, name: "Playlist 2", image: "https://picsum.photos/200/300" },
  { id: 3, name: "Playlist 3", image: "https://picsum.photos/200/300" },
  { id: 4, name: "Playlist 4", image: "https://picsum.photos/200/300" },
];

const PlaylistData = {
  name: "Recently Played",
  songList: [
    {
      name: "Song 1",
      artist: "Artist 1",
      duration: "3:00",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Song 2",
      artist: "Artist 2",
      duration: "3:00",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Song 3",
      artist: "Artist 3",
      duration: "3:00",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Song 4",
      artist: "Artist 4",
      duration: "3:00",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Song 5",
      artist: "Artist 5",
      duration: "3:00",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Song 6",
      artist: "Artist 6",
      duration: "3:00",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Song 7",
      artist: "Artist 7",
      duration: "3:00",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Song 8",
      artist: "Artist 8",
      duration: "3:00",
      image: "https://picsum.photos/200/200",
    },
  ],
};

export const HomeScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const [activeCategory, setActiveCategory] = useState("Recent");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [collectionPlaylist, setCollectionPlaylist] = useState(CollectionPlaylistData);
  const [topSongs, setTopSongs] = useState(PlaylistData.songList);
  


  const fetchdata = async () => {
    try {      
      const response = await axios.get(`${API_URL}/user/${user?.email}`);
      if (response.data?.collections) {
        setCollectionPlaylist(response.data.collections);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchdata();
    }
  }, [user?.email]);

  async function fetchTopSong() {
    try {
      const response = await axios.get(`${API_URL}/topsong/${activeCategory}`);
      if (response.data) {
        setTopSongs(response.data.songs);
        
      }
    } catch (error) {
      console.error('Error fetching top songs:', error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
    }
  }

  useEffect(() => {
    fetchTopSong();
  }, [activeCategory]);

  const handleProfilePress = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    await signOut();
    setShowLogoutModal(false);
  };

  return (
    <RNImageBackground
      source={require("../assets/images/backgroundHomeScreen.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Header Section with Profile */}
          <View style={styles.headerContainer}>
            <View style={styles.profileSection}>
              <View>
                <Text style={styles.titleHeader}>Welcome back!</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
                <Text style={styles.subTitleHeader}>
                  What do you feel like today?
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleProfilePress}
                style={styles.profileContainer}
              >
                {user?.photoURL ? (
                  <Image
                    source={{ uri: user.photoURL }}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.profilePlaceholder}>
                    <Text style={styles.profileInitial}>
                      {user?.email?.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Section */}
          <View style={styles.searchContainer}>
            <Icon
              name="search"
              size={20}
              color={colors.secondary_text}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search song, playlist, artist..."
              placeholderTextColor={colors.secondary_text}
              style={styles.searchInput}
            />
          </View>

          {/* Collection Section */}
          <View style={styles.collectionContainer}>
            <CollectionPlaylist
              CollectionPlaylist={collectionPlaylist}
            />
            {/* <Playlist playlist={topSongs} /> */}
          </View>

          {/* Categories Section */}
          <View style={styles.categoryContainer}>
            {CategoryList.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={styles.categoryItem}
                onPress={() => setActiveCategory(category.name)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category.name &&
                      styles.activeCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
                {activeCategory === category.name && (
                  <View style={styles.underline} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Playlist Section */}
          <View style={styles.playlistContainer}>
            <SongList songList={topSongs} />
          </View>
        </View>

        {/* Add Modal for logout */}
        <Modal
          visible={showLogoutModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLogoutModal(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowLogoutModal(false)}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </RNImageBackground>
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
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  headerContainer: {
    marginBottom: 24,
  },
  titleHeader: {
    fontFamily: "OpenSans-Bold",
    fontSize: 28,
    color: colors.white,
    marginBottom: 8,
  },
  subTitleHeader: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    color: colors.secondary_text,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: colors.white,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  categoryItem: {
    marginRight: 24,
    alignItems: "center",
  },
  categoryText: {
    color: colors.secondary_text,
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
  activeCategoryText: {
    color: colors.white,
  },
  underline: {
    height: 3,
    width: "100%",
    backgroundColor: colors.primary,
    marginTop: 8,
    borderRadius: 2,
  },
  collectionContainer: {
    marginBottom: 24,
  },
  playlistContainer: {
    height: 250,
    marginTop: 24,
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  userEmail: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    color: colors.secondary_text,
    marginBottom: 8,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profilePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "OpenSans-Bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    minWidth: 200,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  logoutText: {
    color: colors.white,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
  },
});

export default HomeScreen;
