import icons from '@/constants/icons';
import { router, usePathname } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, TextInput, TouchableOpacity, View } from 'react-native';

// ^======================== SearchField ========================^ //

type SearchFieldProps = {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (e: string) => void;
  otherStyles?: string;
  initialQuery?: string;
} & React.ComponentProps<typeof TextInput>;;

function SearchField(searchFieldProps: SearchFieldProps): React.JSX.Element {

  const { title, value, placeholder, handleChangeText, otherStyles, initialQuery, ...props } = searchFieldProps;

  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 border-2 rounded-2xl  items-center ${isFocused ? 'border-secondary' : 'border-black-200'} flex-row space-x-4`}
    >
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular focus:border-transparent focus:outline-none'
        value={query}
        placeholder={placeholder}
        placeholderTextColor='#cdcde0'
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert('Missing query', 'Please input something to search results across database')
          }
          if (pathname.startsWith('/search')) router.setParams({query})
            else router.push(`/search/${query}`)
        }}
      >
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