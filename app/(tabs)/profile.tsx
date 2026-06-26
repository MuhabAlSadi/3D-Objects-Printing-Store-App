import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { ComponentProps } from 'react';
import {
  Image,
  Platform // 🚀 FIXED: Added Platform import
  ,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const toggleTheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
  };

  // Safe shadow configurations
  const cardShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  };

  // 🚀 FIXED: Used ComponentProps to extract valid Feather icon names cleanly
  const SettingRow = ({ 
    icon, 
    title, 
    rightElement, 
    isLast = false, 
    onPress,
    danger = false 
  }: { 
    icon: ComponentProps<typeof Feather>['name']; 
    title: string; 
    rightElement?: React.ReactNode; 
    isLast?: boolean; 
    onPress?: () => void;
    danger?: boolean;
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      disabled={!onPress}
      className={`flex-row items-center justify-between py-3.5 ${
        !isLast ? 'border-b border-slate-100 dark:border-slate-700/50' : ''
      }`}
    >
      <View className="flex-row items-center">
        <View className={`w-9 h-9 rounded-xl items-center justify-center ${
          danger ? 'bg-red-50 dark:bg-red-500/10' : 'bg-slate-50 dark:bg-slate-700/60'
        }`}>
          <Feather 
            name={icon} 
            size={18} 
            color={danger ? '#EF4444' : (isDark ? '#94A3B8' : '#4A5568')} 
          />
        </View>
        {/* 🚀 FIXED: Wrapped title correctly inside an expression */}
        <Text className={`text-sm font-semibold ml-3 ${
          danger ? 'text-red-500' : 'text-slate-800 dark:text-white'
        }`}>
          {title}
        </Text>
      </View>
      
      {rightElement !== undefined ? rightElement : (
        <Feather name="chevron-right" size={16} color="#94A3B8" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-backgroundlight dark:bg-[#1E293B] px-4"
    >
      {/* SCREEN HEADER */}
      <View className="pt-4 mb-5">
        <Text className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Profile
        </Text>
      </View>

      {/* 👤 USER PROFILE HERO CARD */}
      <View 
        style={cardShadow} 
        className="bg-white dark:bg-slate-800 rounded-2xl p-4 items-center border border-slate-50 dark:border-slate-700/50"
      >
        <View className="relative">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' }} 
            className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-primary/20"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-white dark:border-slate-800">
            <Feather name="edit-2" size={12} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-black text-slate-900 dark:text-white mt-3 tracking-tight">
          Sarah Ahmed
        </Text>
        <Text className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
          sarah.ahmed@example.com
        </Text>

        {/* PROFILE STATS BAR COUNTERS */}
        <View className="flex-row mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 w-full justify-around">
          <View className="items-center">
            <Text className="text-base font-black text-slate-900 dark:text-white">12</Text>
            <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Orders</Text>
          </View>
          <View className="w-[1px] bg-slate-100 dark:bg-slate-700/60 h-8 self-center" />
          <View className="items-center">
            <Text className="text-base font-black text-slate-900 dark:text-white">4</Text>
            <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Models</Text>
          </View>
          <View className="w-[1px] bg-slate-100 dark:bg-slate-700/60 h-8 self-center" />
          <View className="items-center">
            <Text className="text-base font-black text-primary">$145.50</Text>
            <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Wallet</Text>
          </View>
        </View>
      </View>

      {/* ⚙️ ACCOUNT SETTINGS BLOCK */}
      <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-6 mb-2.5 ml-1">
        Account Settings
      </Text>
      <View 
        style={cardShadow} 
        className="bg-white dark:bg-slate-800 rounded-2xl px-4 border border-slate-50 dark:border-slate-700/50"
      >
        <SettingRow icon="user" title="Personal Information" />
        <SettingRow icon="shopping-bag" title="My Orders" />
        <SettingRow icon="heart" title="My Wishlist" />
        <SettingRow icon="credit-card" title="Payment Methods" isLast={true} />
      </View>

      {/* 🛠️ PREFERENCES BLOCK */}
      <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-6 mb-2.5 ml-1">
        Preferences
      </Text>
      <View 
        style={cardShadow} 
        className="bg-white dark:bg-slate-800 rounded-2xl px-4 border border-slate-50 dark:border-slate-700/50"
      >
        <SettingRow 
          icon={isDark ? "moon" : "sun"} 
          title="Dark Mode" 
          rightElement={
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme}
              trackColor={{ false: '#CBD5E1', true: '#FF7518' }}
              thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
            />
          }
        />
        <SettingRow icon="bell" title="Notifications" />
        <SettingRow icon="shield" title="Privacy & Security" isLast={true} />
      </View>

      {/* 🚪 ACTIONS BLOCK */}
      <View className="mt-6 mb-16">
        <View 
          style={cardShadow} 
          className="bg-white dark:bg-slate-800 rounded-2xl px-4 border border-slate-50 dark:border-slate-700/50"
        >
          <SettingRow icon="log-out" title="Log Out" danger={true} isLast={true} onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
}