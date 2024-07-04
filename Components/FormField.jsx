import { View, Text, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {icons} from '../constants'

const FormField = ({title , value ,handleChangeText, otherStyles , keyboardType , placeholder , ...props}) => {
  const [showPassword , setShowPassword] = useState(false)
    return (
    <View className = {`${otherStyles} space-y-2`}>
      <Text className='text-gray-200 text-base '>{title}</Text>
      <View
      className = 'w-full bg-black-100 h-16 px-4  justify-center  rounded-lg shadow-xl focus:border-secondary item-center flex-row'
      >
       <TextInput 
        className = 'flex-1 text-white font-psemibold text-base'
        value={value}
        placeholder={placeholder}
        placeholderTextColor='gray'
        onChangeText={handleChangeText}
        secureTextEntry={placeholder === 'Password' && !showPassword}
      />
      {placeholder === 'Password' && (
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                    <Image
                    className='w-6 h-6 flex my-auto'
                    resizeMethod='contain'
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    />
        </TouchableOpacity>
      )}
      </View>
    </View>
  )
}

export default FormField