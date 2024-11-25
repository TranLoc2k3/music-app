import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Import icon từ react-native-vector-icons

const Input = ({ placeholder, iconName, iconRight, onChangeText }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  return (
    
    <View style={styles.inputContainer}>
      {/* Hiển thị icon nếu có */}
      {iconName && (
        <Icon name={iconName} size={24} color="#888" style={styles.icon} />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={iconRight ? secureTextEntry : false}
        onChangeText={onChangeText}
      />
      {/* Hiển thị icon nếu có iconright*/}


      <TouchableOpacity onPress={togglePasswordVisibility}>
        {iconRight && (
          <Icon
            name={secureTextEntry ? "eye" : "eye-off"} // Đổi icon tùy thuộc vào trạng thái
            size={24}
            color="#888"
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.1,
    borderColor: "#DBE7E8",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#1E1E1E",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "white",
    marginLeft: 10, // Tạo khoảng cách giữa icon và input
  },
  icon: {
    marginRight: 10, // Khoảng cách giữa icon và text
  },
});

export default Input;
