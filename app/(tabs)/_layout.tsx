import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
// 1. Switch import from Ionicons to Feather
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  // 2. Color adjustments to match the image perfectly
  const activeBlue = '#0066FF'; // Vibrant Sapphire Blue
  const inactiveGray = '#4A5568'; // Darker Slate Gray
  const tabBgColor = '#FFFFFF'; 
  const borderColor = '#E2E8F0';

  const dynamicPaddingBottom = insets.bottom > 0 ? insets.bottom : 12;
  const dynamicTabHeight = 56 + dynamicPaddingBottom; 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeBlue,
        tabBarInactiveTintColor: inactiveGray,
        tabBarStyle: {
          backgroundColor: tabBgColor,
          borderTopColor: borderColor,
          borderTopWidth: 1,
          height: dynamicTabHeight,
          paddingBottom: dynamicPaddingBottom,
          paddingTop: 8,
          // Subtle drop shadow matching the clean style
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
              <Text style={{ color }} className="text-[11px] font-bold mt-0.5 leading-none">
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