import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import icons from '../../constants/icons';

// $======================== TabsLayout ========================$ //

type TabIconProps = {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
};

function TabIcon({ icon, color, name, focused }: TabIconProps) {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='cover'
        tintColor={color}
        style={{ width: 24, height: 24 }}
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'}`}
        style={{
          color: color
        }}
      >
        {name}
      </Text>
    </View>
  );
}

function TabsLayout(): React.JSX.Element {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ffa000',
          tabBarInactiveTintColor: '#cdcde0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 100,
          },
          tabBarIconStyle: {
            height: '100%',
            width: '100%',
          }
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                name='Home'
                focused={focused}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name='bookmark'
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                name='Bookmark'
                focused={focused}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                name='Create'
                focused={focused}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                name='Profile'
                focused={focused}
                color={color}
              />
            )
          }}
        />
      </Tabs>
    </>
  );
}
export default TabsLayout;