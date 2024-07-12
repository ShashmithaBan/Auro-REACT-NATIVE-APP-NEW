import { View, Text, SafeAreaView, ScrollView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import {images} from '../../constants'
import SearchInput from '../../Components/SearchInput'
import Trending from '../../Components/Trending'
import EmptyState from '../../Components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'


const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () =>{
      setIsLoading(true);
      try {
        const response = await getAllPosts();
        setData(response)
      } catch (error) {
        Alert.alert('error',error.message)
      }finally{
        setIsLoading(false)
      }
    }
  
    fetchData();
  }, [])
  
console.log(data)
  onRefresh = async = () =>{
   setRefreshing(true)
   //re call videos=>iif any new videos appeared
   setRefreshing(false)
  }
  return (
    <SafeAreaView className='bg-primary  h-full '>
    {/* i used FlatList becaue ScrollView not give access for to scroll vertical and horizontal at the same time*/}
          <FlatList
          data={[{id:1},{id:2},{id:3}]}
         
          keyExtractor={(item)=>item.$id}
          renderItem={({item})=>(
            <Text className='text-white text-3xl'>
              {item.id}
            </Text>
  )}
          ListHeaderComponent={()=>(
            <View className='my-6 px-4 space-y-6 '>
              <View className='justify-between items-start flex-row mb-6'>
                <View>
                  <Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
                  <Text className='text-xl font-psemibold text-white'>Shashmitha Bandara</Text>
                </View>
                <View className='mt-1.5'>
                    <Image
                    className='w-[35px] h-[35px]'
                    resizeMode='contain'
                    source = {images.logoSmall}
                    />
                </View>
              </View>
              <SearchInput/>
              <View className='w-full flex-1  pt-5'>
                <Text className='text-gray-100 text-lg font-pregular mb-3'>
                  Latest Video
                </Text>
                <Trending
                posts={[{id:1},{id:2},{id:3}] ?? []}
                />
              </View>
            </View>
          )}
          ListEmptyComponent={()=>(
            <EmptyState
            title='No Videos Found'
            subtitle='Be the first one to upload a video'
            />
          )}
          refreshControl={<RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          />}
          />
     
    </SafeAreaView>
  )
}

export default Home