import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
  });



  return (
    <View className = 'flex-1 text-4xl justify-center items-center'>
      <Text className="text-4xl fo">_layout</Text>
      <Text>_layout</Text> 
    </View>
  )
}

export default RootLayout;

const styles = StyleSheet.create({})