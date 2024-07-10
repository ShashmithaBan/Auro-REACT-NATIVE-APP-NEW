import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButtons from './CustomButtons'
import { router } from 'expo-router'

const EmptyState = ({title,subtitle}) => {
  return (
    <View className='justify-center items-center px-3'>
        <Image
        source={images.empty}
        className='w-60 h-64'
        resizeMethod='contain'
      />
     
        <Text className='text-xl font-psemibold text-white'>{title}</Text>
      <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>
      
<CustomButtons
title='Create a Video'
handlePress={()=>router.push('/create')}
containerStyles='w-full my-5'
/>
    
    </View>
  )
}

export default EmptyState