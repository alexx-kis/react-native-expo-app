import CustomButton from '@/components/custom-button';
import FormField from '@/components/form-field';
import { createUser } from '@/lib/appwrite';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';

// #======================== SignUp ========================# //

function SignUp(): React.JSX.Element {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {

    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please, fill in all the fields');
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username)

      // set it to global state...

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      className='bg-primary h-full'
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className='w-full justify-center h-full px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            style={{
              width: 115,
              height: 35
            }}
          />
          <Text className='text-white text-2xl text-semibold mt-10 font-psemibold'>
            Sign up to Aora
          </Text>
          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(e: string) => setForm({
              ...form,
              username: e
            })}
            otherStyles='mt-10'
          />
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
            title='Sign Up'
            handlePress={onSubmit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
            textStyles=''
          />

          <View
            className='justify-center pt-5 flex-row gap-2'
          >
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>
            <Link
              href='/sign-in'
              className='text-lg font-psemibold text-secondary'
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default SignUp;