import { View, Text, SafeAreaView, FlatList, Image, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '../../constants';
import SearchInput from '../../Components/SearchInput';
import Trending from '../../Components/Trending';
import EmptyState from '../../Components/EmptyState';
import {  searchPosts } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppWrite';
import VideoCard from '../../Components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const {query} = useLocalSearchParams()
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppWrite(()=>searchPosts(query));

  useEffect(()=>{
    refetch();
  },[query])

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    // re-call videos if any new videos appeared
    setRefreshing(false);
  };

  console.log(posts);

  return (
    <SafeAreaView className='bg-primary h-full'>
      {/* I used FlatList because ScrollView does not give access to scroll vertically and horizontally at the same time */}
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 '>
            <View className='justify-between items-start flex-row mb-6'>
            
                <Text className='font-pmedium text-sm text-gray-100'>Search Results</Text>
                <Text className='text-xl font-psemibold text-white'>{query}</Text>
               <View className='mt-6 mb-6'>
               <SearchInput initialQuery = {query} />
               </View>
            </View>
            
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videoes found for this query'
          />
        )}
      
      />
    </SafeAreaView>
  );
};

export default Search;