import CustomButton from '@/components/custom-button';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import images from '../constants/images';
import { router } from 'expo-router';

// #======================== index ========================# //

export default function HomeScreen() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center h-full px-4'>
          <Image
            source={images.logo}
            style={{ width: 130, height: 84 }}
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            style={{ maxWidth: 380, width: '100%', height: 300 }}
            resizeMode='contain'
          />
          <View className='mt-5'>
            <Text className=' relative text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with &nbsp;
              <Text className='text-secondary-200'>
                Aora
                <Image
                  source={images.path}
                  style={{ width: 146, height: 15 }}
                  resizeMode='contain'
                  className='absolute w-[136px] h-[15px] -bottom-2 -right-8'
                />
              </Text>
            </Text>
          </View>
          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>
          <CustomButton
            title='Continue with Email'
            handlePress={() => { router.push('/sign-in')}}
            containerStyles='w-full mt-7'
            textStyles=''
            isLoading={false}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622'/>
    </SafeAreaView>
  );
}
