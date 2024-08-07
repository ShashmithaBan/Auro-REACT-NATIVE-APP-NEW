import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { icons, images } from '../../constants';
import InfoBox from '../../Components/InfoBox';
import Trending from '../../Components/Trending';
import EmptyState from '../../Components/EmptyState';
import { getUserPosts, signOut } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppWrite';
import VideoCard from '../../Components/VideoCard';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../Context/GlobalProvider';

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppWrite(()=>getUserPosts(query));

  const logout = async() =>{
   await signOut();
   setUser(null);
   setIsLoggedIn(false);

   router.replace('/sign-in')
  }

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
          <View className='w-full justify-center items-center mt-6 mb-12  px-4'>
            <TouchableOpacity className='w-4 items-end mb-10'
            onPress={logout}
            >
              <Image
              source={icons.logout}
              resizeMode='contain'
              className='w-6 h-6'
              />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
              source={{uri: user?.avatar}}
              className =' w-[90%] h-[90%]'
              resizeMode='cover'
              />
            </View>
            <InfoBox
                title = {user?.username}
                containerStyles = 'mt-5'
                titleStyle = 'text-lg'
            /> 
            <View className='mt-5 flex-row'>
            <InfoBox
                title = {posts.length || 0}
                subtitle="Posts"
                containerStyles = 'mr-10'
                titleStyle = 'text-xl'
            /> 
            <InfoBox
                title = "1.2k"
                subtitle="Followers"
                titleStyle = 'text-xl'
            />
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

export default Profile;