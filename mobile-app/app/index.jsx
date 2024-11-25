import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PlayListScreen from "../screens/PlayListScreen";
import NowPlayingScreen from "../screens/NowPlayingScreen";
const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PlayListScreen" component={PlayListScreen} />
      <Stack.Screen name="NowPlayingScreen" component={NowPlayingScreen} />
    </Stack.Navigator>
  );
};

export default index;

const styles = StyleSheet.create({});
