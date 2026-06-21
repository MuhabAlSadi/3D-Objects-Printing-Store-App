import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const activeOrange = '#FF7518'; // Vibrant Orange
  const inactiveGray = isDark ? '#F8FAFC' : '#4A5568'; // Darker Slate Gray
  const tabBgColor = isDark ? '#334155' : '#FFFFFF';
  const borderColor = isDark ? '#0F172A' : '#E2E8F0';

  const dynamicPaddingBottom = insets.bottom > 0 ? insets.bottom : 12;
  const dynamicTabHeight = 64 + dynamicPaddingBottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeOrange, // Icons Tabs Color when active
        tabBarInactiveTintColor: inactiveGray, // Icons Tabs Color when inactive 
        tabBarStyle: {
          backgroundColor: tabBgColor, // The color of the Tabs Bar Background 
          borderTopColor: borderColor, // The color of the top line of the bar
          borderTopWidth: 1,
          height: dynamicTabHeight,
          paddingBottom: dynamicPaddingBottom,
          paddingTop: 8,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.03,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      {/* 1. HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />

      {/* 2. EXPLORE TAB */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Feather name="compass" size={22} color={color} />
          ),
        }}
      />

      {/* 3. UPLOAD TAB */}
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => (
            <Feather name="upload" size={22} color={color} />
          ),
        }}
      />

      {/* 4. CART TAB WITH COUNTER BADGE */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center">
              <Feather name="shopping-cart" size={22} color={color} />
              {/* This text element accurately places the item count 
                directly underneath the icon basket just like your screenshot!
              */}
              <Text style={{ color }} className="text-[11px] font-bold mt-0.5 ml-1 leading-none">
                0
              </Text>
            </View>
          ),
        }}
      />

      {/* 5. PROFILE TAB */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}