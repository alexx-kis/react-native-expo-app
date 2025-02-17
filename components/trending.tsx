import { useState } from 'react';
import { FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

// ^======================== Trending ========================^ //

// type TrendingProps = {
//   prop: type;
// };

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  }
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  }
};

function TrendingItem(trendingItemProps: TrendingItemProps): React.JSX.Element {

  const { activeItem, item } = trendingItemProps;

  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={5000}
    >
      {
        play
          ? (
            <Text className='text-white'>
              Playing
            </Text>
          )
          : (
            <TouchableOpacity
              className='relative justify-center items-center'
              activeOpacity={0.7}
              onPress={() => setPlay(true)}
            >
              <ImageBackground />
            </TouchableOpacity>
          )
      }
    </Animatable.View>
  );
}

type TrendingItemProps = {
  posts: { $id: string; }[];
};

function Trending(trendingItemProps: TrendingItemProps): React.JSX.Element {

  const { posts } = trendingItemProps;

  const [activeItem, setActiveItem] = useState(posts[0]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id.toString()}
      renderItem={({ item }) => (
        <TrendingItem
          currentlyActiveItem={activeItem}
          // item={ }
        >

        </TrendingItem>
      )}
      horizontal
    />
  );
}
export default Trending;