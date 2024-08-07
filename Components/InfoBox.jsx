import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title , subtitle , containerStyles , titleStyles}) => {
  return (
    <View className =  {containerStyles}>
      <Text className = {`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
      <Text className = {`text-gray-100 text-sm text-center font-pregular ${titleStyles}`}>{title}</Text>
    </View>
  )
}

export default InfoBox