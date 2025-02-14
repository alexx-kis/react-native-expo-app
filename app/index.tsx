import CustomButton from '@/components/custom-button';
import { router } from 'expo-router';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import images from '../constants/images';

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
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with &nbsp;
              <View className='relative inline-flex'>
                <View style={{
                  transform: Platform.OS === 'ios' ? [{ translateY: 14 }] : [],
                  position: 'relative',
                }}>
                  <Text
                    className='text-secondary-200 text-3xl font-bold'
                  >
                    Aora
                  </Text>
                </View>
                <Image
                  source={images.path}
                  resizeMode='contain'
                  className='absolute w-[136px] h-[15px] -right-8'
                  style={{
                    width: 146, 
                    height: 15, 
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? -22 : -8
                  }}
                />
              </View>
            </Text>
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>
          <CustomButton
            title='Continue with Email'
            handlePress={() => { router.push('/sign-in'); }}
            containerStyles='w-full mt-7'
            textStyles=''
            isLoading={false}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' />
    </SafeAreaView>
  );
}
