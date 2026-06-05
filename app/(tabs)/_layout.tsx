import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

export default function TabsLayout() {
  // Brand Color Configurations based on our design
  const primaryOrange = '#FF6F00';
  const inactiveGray = '#8E8E93';
  
  // Note: For full dark mode toggle, you would read your theme state here. 
  // This setup assumes Light Mode but uses a highly adaptable modern profile.
  const tabBgColor = '#FFFFFF'; 
  const borderColor = '#E9ECEF';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryOrange,
        tabBarInactiveTintColor: inactiveGray,
        tabBarStyle: {
          backgroundColor: tabBgColor,
          borderTopColor: borderColor,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 100,
          paddingBottom: Platform.OS === 'ios' ? 28 : 30,
          paddingTop: 8,
          elevation: 8, // Shadow for Android
          shadowColor: '#000', // Shadow for iOS
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: tabBgColor,
          shadowColor: borderColor,
        },
        headerTintColor: '#121212',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      {/* 1. HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* 2. EXPLORE TAB */}
      <Tabs.Screen
        name="explore" // Must match the new file name verbatim
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* 3. PRINT STUDIO (CENTER UPLOAD BUTTON) */}
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Print',
          tabBarIcon: ({ focused }) => (
            <View 
              // Using NativeWind styling to create a floating, modern action circle
              className={`
                items-center justify-center w-14 h-14 rounded-full -mt-6 shadow-md
                ${focused ? 'bg-amber-700' : 'bg-[#FF6F00]'}
              `}
              style={{
                shadowColor: primaryOrange,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Ionicons name="add" size={30} color="#FFFFFF" />
            </View>
          ),
          // Hides the standard tab label for the center action button to keep it clean
          tabBarLabel: () => null, 
        }}
      />

      {/* 4. CART TAB */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* 5. PROFILE TAB */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}