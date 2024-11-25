import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { CollectionItem } from "./CollectionItem";
import Colors from "../styles/colors";

export const CollectionPlaylist = ({CollectionPlaylist }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={CollectionPlaylist}
        renderItem={({ item }) => <CollectionItem item={item} />}
        keyExtractor={(item) => item.name}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
  },
})