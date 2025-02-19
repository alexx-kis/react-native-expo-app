import { VideoCardType } from '@/types';
import { useCallback, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import TrendingItem from './trending-item';

// ^======================== TrendingList ========================^ //

type TrendingListProps = {
  posts: VideoCardType[];
};

function TrendingList(trendingListProps: TrendingListProps): React.JSX.Element {

  const { posts } = trendingListProps;

  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[]; }) => {
    if (viewableItems.length > 0) {
      const visibleItem = posts.find(item => item.$id === viewableItems[0].key);
      if (visibleItem) {
        setActiveItem(visibleItem);
      }
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id.toString()}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
        >
        </TrendingItem>
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 75
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
}
export default TrendingList;