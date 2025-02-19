import EmptyState from '@/components/empty-state';
import SearchField from '@/components/search-input';
import Trending from '@/components/trending';
import VideoCard from '@/components/video-card';
import images from '@/constants/images';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/use-appwrite';
import { VideoCardType } from '@/types';
import { useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// #======================== Home ========================# //

function Home(): React.JSX.Element {

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  console.log(posts)

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts as VideoCardType[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard item={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 sp-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome Back
                </Text>
                <Text className='text-2xl font-psemibold text-white '>
                  JSMastery
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  resizeMode='contain'
                  style={{
                    width: 36,
                    height: 36,
                  }}
                />
              </View>
            </View>
            <SearchField placeholder='Search for a video topic' />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Videos
              </Text>
              <Trending posts={latestPosts as VideoCardType[]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Be the first one to upload the video'
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>

  );
}
export default Home;