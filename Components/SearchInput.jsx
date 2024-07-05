import { View, Text, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {icons} from '../constants'

const SearchInput = ({title , value ,handleChangeText, otherStyles , keyboardType , placeholder , ...props}) => {
  const [showPassword , setShowPassword] = useState(false)
    return (
   
      <View
      className = 'w-full bg-black-100 h-16 px-4  justify-center  rounded-lg shadow-xl focus:border-secondary item-center flex-row'
      >
       <TextInput 
        className = 'text-base mt-0.5 text-white flex-1 font-pregular'
        value={value}
        placeholder={placeholder}
        placeholderTextColor='gray'
        onChangeText={handleChangeText}
        secureTextEntry={placeholder === 'Password' && !showPassword}
      />
      
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                    <Image
                    className='w-5 h-5 my-auto'
                    resizeMethod='contain'
                    source={icons.search}
                    />
        </TouchableOpacity>
      
      </View>
  
  )
}

export default SearchInput