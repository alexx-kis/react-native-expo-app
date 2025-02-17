import icons from '@/constants/icons';
import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

// ^======================== SearchField ========================^ //

type SearchFieldProps = {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (e: string) => void;
  otherStyles?: string;
} & React.ComponentProps<typeof TextInput>;;

function SearchField(searchFieldProps: SearchFieldProps): React.JSX.Element {


  const { title, value, placeholder, handleChangeText, otherStyles, ...props } = searchFieldProps;

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 border-2 rounded-2xl  items-center ${isFocused ? 'border-secondary' : 'border-black-200'} flex-row space-x-4`}
    >
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular focus:border-transparent focus:outline-none'
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity>
        <Image
          source={icons.search}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
export default SearchField;