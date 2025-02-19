import images from '@/constants/images';
import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';
import CustomButton from './custom-button';

// ^======================== EmptyState ========================^ //

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

function EmptyState(emptyStateProps: EmptyStateProps): React.JSX.Element {

  const { title, subtitle } = emptyStateProps;

  return (
    <View className='justify-center items-center px-4'>
      <Image
        source={images.empty}
        style={{
          width: 270,
          height: 215
        }}
        resizeMode='contain'
      />
      <Text className='text-xl text-center font-psemibold text-white mt-2'>
        {title}
      </Text>
      <Text className='font-pmedium text-sm text-gray-100' >
        {subtitle}
      </Text>
      <CustomButton
        title='Create a video'
        handlePress={() => router.push('/create')}
        containerStyles='w-full my-5'
      />
    </View>
  );
}
export default EmptyState;