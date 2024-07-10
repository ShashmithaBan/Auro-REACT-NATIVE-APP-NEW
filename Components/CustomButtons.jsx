import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const CustomButtons = ({title,handlePress , containerStyles , textStyles , isLoading}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}   
    className = {`mt-5 bg-secondary-100 min-h-[62px] min-w-[250px] rounded-xl justify-center items-center ${containerStyles}
    ${isLoading ? 'opacity-50':''} `}
    disabled={isLoading}
    >
      <Text className={`text-center text-lg font-psemibold text-white ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButtons


// activeOpacity is like button hover