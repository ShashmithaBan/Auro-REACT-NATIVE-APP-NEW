import { StyleSheet, Text, View } from 'react-native'
import  { useEffect } from 'react'
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();// this prevent autohiding befor the assests load

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
//It allows us to performs some action while the page is loading
useEffect(()=>{
if(error) throw error;
if(fontsLoaded) SplashScreen.hideAsync();//splashscreen is like a preload animation that we are used in web applications
}
,[fontsLoaded,error])//Here it says that recall the functions when fontsloaded will change or there' s a error

if(!fontsLoaded &&!error) return null;

  return (
<>
<Stack>
    <Stack.Screen name='index' options={{headerShown:false}}/>
    <Stack.Screen name='(auth)' options={{headerShown:false}}/>
    <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
    <Stack.Screen name='/search/[query]' options={{headerShown:false}}/>
    
   </Stack>
<StatusBar backgroundColor='#161622' style='light'/> 
</>
   

  )
}

export default RootLayout;
