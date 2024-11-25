import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Font from "../components/Font";
import Input from "../components/Input";
import { CheckBox } from "react-native-elements";
import ButtonCustom from "../components/ButtonCustom";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ImageBackground as RNImageBackground } from "react-native";
import colors from "../styles/colors";

const HorizontalLineWithText = ({ text }) => {
  return (
    <View style={styles.horizontalLineWithText}>
      <View style={styles.horizontalLine}></View>
      <Text style={styles.horizontalLineText}>{text}</Text>
      <View style={styles.horizontalLine}></View>
    </View>
  );
};

const LoginScreens = ({ navigation }) => {
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      "987610914970-gmbnelqv6kck2pk55ev3r0kic5i7fbb2.apps.googleusercontent.com",
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      
      await GoogleSignin.signOut();
      
      const response = await GoogleSignin.signIn();
      if (!response.data.idToken) {
        console.log('Google Sign In was unsuccessful. Try again later.');
        return;
      }
      const googleCredential = auth.GoogleAuthProvider.credential(
        response.data.idToken
      );

      return auth().signInWithCredential(googleCredential).then((userCredential) => {
        if (response.user && !userCredential.user.photoURL) {
          userCredential.user.updateProfile({
            photoURL: response.user.photo,
          });
        }
        navigation.navigate("HomeScreen");
      });
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('Operation in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available');
            break;
          default:
            console.log('Other error:', error.code);
        }
      } else {
        console.log('Unexpected error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <RNImageBackground
        source={require("../assets/images/backgroundStartScreen.png")}
        style={styles.image}
        pointerEvents="box-none"
      >
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Feel the beat</Text>
          <Text style={styles.subtitle}>
            Immerse yourself into the world of music today
          </Text>
          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={signInWithGoogle}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </RNImageBackground>
    </View>
  );
};

export default LoginScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  loginContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary_text,
    padding: 12,
  },
  subtitle: {
    width: "50%",
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
    textAlign: "center",
    color: colors.secondary_text,
    padding: 12,
    marginBottom: 20,
  },
  buttonContainer: {
    width: 250,
    height: 50,
    borderRadius: 20,
    backgroundColor: colors.primary_background,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: colors.primary_text,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
  },
});
