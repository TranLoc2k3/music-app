import React from "react";
import { ImageBackground as RNImageBackground, StyleSheet } from "react-native";

export const ImageBackground = ({ source, style, children }) => {
  return (
    <RNImageBackground source={source} style={[styles.image, style]}>
      {children}
    </RNImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
});