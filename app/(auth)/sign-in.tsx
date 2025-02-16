import CustomButton from '@/components/custom-button';
import FormField from '@/components/form-field';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';

// #======================== SignIn ========================# //

function SignIn(): React.JSX.Element {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => { };

  return (
    <SafeAreaView
      className='bg-primary h-full'
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className='w-full justify-center h-full px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-white text-2xl text-semibold mt-10 font-psemibold'>
            Log in to Aora
          </Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e: string) => setForm({
              ...form,
              email: e
            })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e: string) => setForm({
              ...form,
              password: e
            })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Sign In'
            handlePress={onSubmit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
            textStyles=''
          />

          <View
            className='justify-center pt-5 flex-row gap-2'
          >
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link
              href='/sign-up'
              className='text-lg font-psemibold text-secondary'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default SignIn;