import icons from '@/constants/icons';
import { VideoCardType } from '@/types';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

// ^======================== VideoCard ========================^ //

export type VideoCardProps = {
  item: VideoCardType;
};

function VideoCard(videoCardProps: VideoCardProps): React.JSX.Element {

  const { item: { title, thumbnail, video, users } } = videoCardProps;

  const [play, setPlay] = useState(false);

  return (
    <View className='flex-col items-center px-4 mb-14'
      style={{
        marginBottom: 56,
      }}>
      <View className='flex-row gap-3 items-start w-full'>
        <View className='justify-center items-center flex-row flex-1 '>
          <View className='w-[46px] h-[46px] rounded-lg justify-center items-center p-0.5 border-2 border-secondary'
            style={{
              width: 46,
              height: 46,
              borderRadius: 8,
            }}>
            <Image
              source={{ uri: users?.avatar }}
              resizeMode='cover'
              style={{
                width: 40,
                height: 40,
                borderRadius: 5,
                padding: 0.5
              }}
            />
          </View>
          <View
            className='justify-center flex-1 ml-3 gap-y-1'
            style={{
              marginLeft: 12,
              flex: 1,
              gap: 1,
            }}
          >
            <Text className='text-white font-psemibold text-sm' numberOfLines={1}>
              {title!}
            </Text>
            <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>
              {users?.username}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: 8,
          }}>
          <Image
            source={icons.menu}
            resizeMode='contain'
            style={{
              width: 20,
              height: 20
            }}
          />
        </View>
      </View>
      {
        play
          ? (
            <iframe
              src={video}
              width="208"
              height="288"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{
                flexShrink: 0,
                width: '100%',
                height: 240,
                borderRadius: 35,
                marginTop: 12,
                backgroundColor: '#ffffff1a',
                marginBlock: 20,
              }}
            />
          )
          : (
            <TouchableOpacity
              className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
              activeOpacity={0.7}
              onPress={() => setPlay(true)}
            >
              <Image
                source={{ uri: thumbnail }}
                resizeMode='cover'
                className='h-full'
                style={{
                  width: '100%',
                  height: 240,
                  borderRadius: 16,
                  marginTop: 12,
                }}
              />
              <Image
                source={icons.play}
                resizeMode='contain'
                style={{
                  width: 48,
                  height: 48,
                  position: 'absolute',
                }}
              />
            </TouchableOpacity>
          )
      }
    </View>
  );
}
export default VideoCard;