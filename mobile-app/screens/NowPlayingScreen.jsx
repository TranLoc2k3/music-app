import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground as RNImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import { Audio } from 'expo-av';


const songDefault = {
  name: "id 072019",
  artist: "W/n",
  duration: "04:12",
  image: "https://i.ytimg.com/vi/kfw7MYah2n0/maxresdefault.jpg",
  url: "https://thuanhighclean.s3.ap-southeast-1.amazonaws.com/thienlyoi.mp3"
}
export const NowPlayingScreen = ({route}) => {
  const { song } = route.params || songDefault;
  const [songData, setSongData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);

  // Thêm state để lưu sound object
  const [sound, setSound] = useState(null);
  
  // Thay thế setup TrackPlayer bằng setup Audio
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log('Error setting up audio:', error);
      }
    };
    setupAudio();

    // Cleanup
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Cập nhật fetchSongData
  useEffect(() => {
    const fetchSongData = async () => {
      const mockSongData = {
        songId: 'IDSong',
        title: song.name,
        artist: song.artist,
        duration: parseInt(song.duration.split(':')[0]) * 60 + parseInt(song.duration.split(':')[1]),
        artwork: song.image,
        url: song.url,
      };
      
      setSongData(mockSongData);
      setDuration(mockSongData.duration);
      
      try {
        // Unload existing sound if any
        if (sound) {
          await sound.unloadAsync();
        }
        
        // Load new sound
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: mockSongData.url },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
        
        // Setup position update listener
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setCurrentTime(status.positionMillis / 1000);
          }
        });
      } catch (error) {
        console.log('Error loading audio:', error);
      }
    };

    fetchSongData();
  }, []);

  // Cập nhật handlePlayPause
  const handlePlayPause = async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePrevious = () => {
    // Implement previous song logic
  };

  const handleNext = () => {
    // Implement next song logic
  };

  const handleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  const handleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
  };

  if (!songData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <RNImageBackground
      source={require('../assets/images/backgroundHomeScreen.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-down" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="ellipsis-horizontal" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Album Art */}
        <View style={styles.artworkContainer}>
          <View style={styles.artwork}>
            <RNImageBackground
              source={{ uri: songData.artwork }}
              style={styles.artworkImage}
              borderRadius={12}
            />
          </View>
        </View>

        {/* Song Info */}
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{songData.title}</Text>
          <Text style={styles.artistName}>{songData.artist}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progress, 
                { width: `${(currentTime / duration) * 100}%` }
              ]} 
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.controlButton, isShuffleOn && styles.activeControl]}
            onPress={handleShuffle}
          >
            <Icon name="shuffle" size={24} color={isShuffleOn ? colors.primary : colors.white} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={handlePrevious}
          >
            <Icon name="play-skip-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={handlePlayPause}
          >
            <Icon 
              name={isPlaying ? "pause" : "play"} 
              size={32} 
              color={colors.white} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={handleNext}
          >
            <Icon name="play-skip-forward" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.controlButton, isRepeatOn && styles.activeControl]}
            onPress={handleRepeat}
          >
            <Icon name="repeat" size={24} color={isRepeatOn ? colors.primary : colors.white} />
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    marginBottom: 32,
  },
  artworkContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  artistName: {
    fontSize: 16,
    color: colors.secondary_text,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progress: {
    width: '30%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    color: colors.secondary_text,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  controlButton: {
    padding: 12,
  },
  playButton: {
    width: 64,
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  activeControl: {
    opacity: 1,
  },
}); 

export default NowPlayingScreen;