import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
  });



  return (
    <View className = 'flex-1 text-4xl justify-center items-center'>
      <Text className="font-bold">_layout2</Text>
      <Text>_layout</Text> 
    </View>
  )
}

export default RootLayout;
