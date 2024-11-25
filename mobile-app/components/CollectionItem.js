import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import { useNavigation } from '@react-navigation/native';

export const CollectionItem = ({ item }) => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.navigate("PlayListScreen", { playListId: item.id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        style={styles.imageCollection}
        source={{ uri: item.image }}
        alt={item.name}
      />
      <Text style={styles.nameCollection}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 250,
    marginRight: 20,
  },
  imageCollection: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  nameCollection: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
    color: colors.primary_text,
    paddingVertical: 12,
  },
});
