import EmptyState from '@/components/empty-state';
import InfoBox from '@/components/info-box';
import VideoCard from '@/components/video-card';
import icons from '@/constants/icons';
import { useGlobalContext } from '@/context/global-provider';
import { getUserPosts } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/use-appwrite';
import { VideoCardType } from '@/types';
import { useEffect } from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';

// #======================== Profile ========================# //

function Profile(): React.JSX.Element {

  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => {
    if (!user?.$id) return Promise.resolve([]);
    return getUserPosts(user.$id);
  });

  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [user?.id]);

  const logout = () => { };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts as VideoCardType[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard item={item} />
        )}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                resizeMode='cover'
                style={{
                  width: '90%',
                  height: '90%',
                  borderRadius: 6,
                }}
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <View className='mt-5 flex-row'>
            <InfoBox
              title={posts.length || 0}
              subtitle='Posts'
              containerStyles='mr-10'
              titleStyles='text-xl'
            />
            <InfoBox
              title='1.2k'
              subtitle='Followers'
              titleStyles='text-xl'
            />
              
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videos found for this search query'
          />
        )}
      />
    </SafeAreaView>

  );
}
export default Profile;