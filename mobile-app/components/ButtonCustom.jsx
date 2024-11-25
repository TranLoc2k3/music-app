import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E85C0D', // Màu nền của nút
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#ffffff', // Màu chữ
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default CustomButton;
