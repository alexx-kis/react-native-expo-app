import icons from '@/constants/icons';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

// ^======================== FormField ========================^ //

type FormFieldProps = {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
} & React.ComponentProps<typeof TextInput>;;

function FormField(formFieldProps: FormFieldProps): React.JSX.Element {


  const { title, value, placeholder, handleChangeText, otherStyles, ...props } = formFieldProps;

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`space-y-2 ${otherStyles}`}
    >
      <Text
        className='text-base text-gray-100 font-pmedium mb-2'
      >
        {title}
      </Text>
      <View
        className={`w-full h-16 px-4 bg-black-100 border-2 rounded-2xl  items-center ${isFocused ? 'border-secondary' : 'border-black-200'} flex-row`}
      >
        <TextInput
          className='w-full flex-1 text-white font-psemibold text-base focus:border-transparent focus:outline-none'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {title == 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode='contain'
              style={{
                width: 24,
                height: 24
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default FormField;