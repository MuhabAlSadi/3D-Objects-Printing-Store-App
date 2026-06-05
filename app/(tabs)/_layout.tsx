import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
// 1. Import the safe area hook
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  // 2. Grab the exact system insets for the current device
  const insets = useSafeAreaInsets();
  
  const primaryOrange = '#FF6F00';
  const inactiveGray = '#8E8E93';
  const tabBgColor = '#FFFFFF'; 
  const borderColor = '#E9ECEF';

  // 3. Calculate a dynamic height based on the bottom inset
  // If the phone has a software bar (like yours), insets.bottom will be large.
  // If it's a completely flat screen, we provide a standard fallback padding.
  const dynamicPaddingBottom = insets.bottom > 0 ? insets.bottom : 12;
  const dynamicTabHeight = 56 + dynamicPaddingBottom; 

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
          
          // 4. Inject our smart dynamic heights here
          height: dynamicTabHeight,
          paddingBottom: dynamicPaddingBottom,
          paddingTop: 8,
          
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
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
        name="explore"
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
              className={`
                items-center justify-center w-14 h-14 rounded-full shadow-md
                ${focused ? 'bg-amber-700' : 'bg-[#FF6F00]'}
              `}
              // We adjust the breakout height relative to the dynamic height
              style={{
                marginTop: insets.bottom > 0 ? -24 : -16,
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