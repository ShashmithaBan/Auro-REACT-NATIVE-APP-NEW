import {  Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect , router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from '../constants'
import CustomButtons from '../Components/CustomButtons'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../Context/GlobalProvider'


const index = () => {
const {isLoading , isLoggedIn} = useGlobalContext();
if(!isLoading && isLoggedIn) return <Redirect href='/home'/>

  return (//most outer view should for different devices so we used safeareaview
    <SafeAreaView className = 'bg-primary h-full'>

      {/* sometimes the content might be larger than the small devices . so it might be scroll down */}
      <ScrollView contentContainerStyle = {{height:'100%'}}>

       <View className="w-full  px-4 h-full items-center justify-center">
          <Image className = " w-[130px] h-[80px]"
          source = {images.logo}
          resizeMode='contain'
          />
          <Image
          className='max-w- [380px] w-full h-[300px]'
            source={images.cards}
            resizeMode='contain'
          />
          <View className='relative mt-5'>
              <Text className='text-3xl items-center text-white font-psemibold '>
                  Discober the Endless possibilities with {' '}
                  <Text className='text-secondary-200 '>
                      Aora               
                  </Text>              
              </Text>
              <Image
                    className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                    source={images.path}
                    resizeMode='contain'
                />
          </View>
          <Text className='text-neutral-300 mt-5 text-center font-pregular  '>
            Where creativity meets innovations : embark on a journey of limitless exploration with Aora
          </Text>
          <CustomButtons
          title = 'Continue with Email'
          handlePress = {()=>{router.push('/sign-in')}}
          containerStyles = "w-full mt-7 "
          />
       </View>
</ScrollView>

    </SafeAreaView>
  )
}

export default index

{/*StatusBar-this one is used to hide the status bar "like the time battery precentage"*/}