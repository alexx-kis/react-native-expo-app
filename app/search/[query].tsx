import EmptyState from '@/components/empty-state';
import SearchField from '@/components/search-input';
import VideoCard from '@/components/video-card';
import { searchPosts } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/use-appwrite';
import { VideoCardType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

// #======================== Search ========================# //

function Search(): React.JSX.Element {

  const { query } = useLocalSearchParams();
  const queryString = Array.isArray(query) ? query[0] : query;

  const { data: posts, refetch } = useAppwrite(() => searchPosts(queryString));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts as VideoCardType[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard item={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>

            <Text className='font-pmedium text-sm text-gray-100'>
              Search results
            </Text>
            <Text className='text-2xl font-psemibold text-white '>
              {query}
            </Text>
            <View className='mt-6 mb-8'>
              <SearchField
                placeholder='Search for a video topic'
                initialQuery={query as string}
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
export default Search;
