import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const VideoCard = ({ video: { title,  thumbnail , video , creator: { username, avatar } } }) => {
    const [play, setPlay] = useState(false)
  return (
    <View className='flex-col items-center px-4 mb-14'>
        <View className='flex-row gap-3 items-start'>
            <View className='items-center justify-center flex-row flex-1 gap-2'>
            <View className='w-[46px] h-[46px] border-secondary items-center p-0.5 border rounded-full'>
                <Image
                source={{uri:avatar}}
                className='w-full h-full rounded-full'
                resizeMode='cover'
                />
            </View>
            <View className ='flex-col flex-1 gap-y-1 ml-2  '>
            <Text className='h-[20px] text-white' numberOfLines={1}>{title}</Text>
            <Text className='text-white'>{username}</Text>
            </View>
            </View>
           <View className='pt-4'>
           <Image source={icons.menu} className='h-5 w-6' resizeMode='contain'/>
           </View>
            
        </View>
       {play ?
(      <Text>Playing</Text>)
      :
      (
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>setPlay(true)}
        className = 'w-full h-60 rounded-xl mt-3 relative justify-content tems-center'
        >
            <Image
            source={{uri :thumbnail}}
            className = 'w-full h-full rounded-xl mt-3'
            resizeMode='cover'
            />
            <Image
            source={icons.play}
            className = 'h-12 w-12 absolute'
            resizeMode='contain'
            />
        </TouchableOpacity>
      )
      }
    </View>
  );
};



export default VideoCard;
