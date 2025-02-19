import icons from '@/constants/icons';
import { VideoCardType } from '@/types';
import { useState } from 'react';
import { Image, ImageBackground, ImageStyle, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';

// ^======================== TrendingItem ========================^ //

type TrendingItemProps = {
  activeItem: VideoCardType;
  item: VideoCardType;
};

const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

function TrendingItem(trendingItemProps: TrendingItemProps): React.JSX.Element {

  const { activeItem, item } = trendingItemProps;
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {
        play
          ? (
            <iframe
              src={item.video}
              width="208"
              height="288"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{
                flexShrink: 0,
                width: 208,
                height: 288,
                borderRadius: 35,
                marginTop: 12,
                backgroundColor: '#ffffff1a',
                marginBlock: 20,
              }}
            />
          )
          : (
            <TouchableOpacity
              className='relative justify-center items-center'
              activeOpacity={0.7}
              onPress={() => setPlay(true)}
            >
              <ImageBackground
                source={{
                  uri: item.thumbnail
                }}
                className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                resizeMode='cover'
              />
              <Image
                source={icons.play}
                resizeMode='contain'
                style={{
                  position: 'absolute',
                  width: 48,
                  height: 48,
                }}
              />
            </TouchableOpacity>
          )
      }
    </Animatable.View>
  );
}
export default TrendingItem;