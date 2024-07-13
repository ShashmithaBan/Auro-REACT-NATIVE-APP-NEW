import { View, Text, SafeAreaView, FlatList, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { images } from '../../constants';
import SearchInput from '../../Components/SearchInput';
import Trending from '../../Components/Trending';
import EmptyState from '../../Components/EmptyState';
import { getAllPosts } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppWrite';
import VideoCard from '../../Components/VideoCard';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppWrite(getAllPosts);

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
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
                <Text className='text-xl font-psemibold text-white'>Shashmitha Bandara</Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  className='w-[35px] h-[35px]'
                  resizeMode='contain'
                  source={images.logoSmall}
                />
              </View>
            </View>
            <SearchInput />
            <View className='w-full flex-1 pt-5'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Video
              </Text>
              <Trending posts={posts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Be the first one to upload a video'
          />
        )}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
