import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Text, View, ActivityIndicator } from 'react-native';

// Tạo component FontLoader để tải font
const FontLoader = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Hàm load font
  const loadFonts = async () => {
    await Font.loadAsync({
      'SonsieOne': require('../assets/fonts/SonsieOne-Regular.ttf'),
      // Thêm các font khác nếu cần
    });
    setFontsLoaded(true);
  };

  // Gọi hàm load font khi component được render
  useEffect(() => {
    loadFonts();
  }, []);

  // Kiểm tra nếu font chưa load xong thì hiện loading, nếu load xong thì hiển thị nội dung con
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return children;
};

export default FontLoader;
