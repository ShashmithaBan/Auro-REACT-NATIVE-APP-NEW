import { View, Text, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {icons} from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '')
    return (
   
      <View
      className = 'w-full bg-black-100 h-16 px-4  justify-center  rounded-lg shadow-xl focus:border-secondary item-center flex-row'
      >
       <TextInput 
        className = 'text-base mt-0.5 text-white flex-1 font-pregular'
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor='#CDCDE0'
        onChangeText={(e)=> setQuery(e)}
      
      />
      
        <TouchableOpacity
        onPress={()=>{
          if(!query){
            return Alert.alert('Missing query', "Please input something to search")
          }
          if(pathname.startsWith('/search')) router.setParams({query})
            else router.push('/search/$query')
        }}
        >
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