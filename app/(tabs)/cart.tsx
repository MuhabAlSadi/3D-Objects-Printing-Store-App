import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const INITIAL_CART = [
  {
    id: '1',
    title: 'Low Poly Articulated Dragon',
    category: 'Toys & Gadgets',
    price: 15.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1615840287214-7fe58a8f668f?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Mechanical Gear Assembly',
    category: 'Engineering',
    price: 24.50,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=200&auto=format&fit=crop',
  }
];

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // 🚀 Navigation router instance
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [promoCode, setPromoCode] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.00 : 0.00;
  const total = subtotal + shipping;

  const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

  const updateQuantity = (id: string, amount: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Safe shadow definitions
  const cardShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  };

  const primaryButtonShadow = {
    shadowColor: '#FF7518',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-backgroundlight dark:bg-[#1E293B]"
    >
      {/* HEADER BAR WITH BACK ARROW */}
      <View 
        style={{ paddingTop: insets.top }} 
        className="px-4 bg-white dark:bg-secondary pb-4 border-b border-slate-100 dark:border-slate-700 flex-row items-center"
      >
        {/* 🚀 Back arrow navigates to the Home (index) tab */}
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)')} 
          className="mr-3 p-1 rounded-lg active:bg-slate-100 dark:active:bg-slate-700 mt-2"
        >
          <Feather name="arrow-left" size={22} color="#FF7518" />
        </TouchableOpacity>
        
        <Text className="text-xl font-black text-slate-950 dark:text-white mt-2">
          My Cart {cartItems.length > 0 && `(${cartItems.length})`}
        </Text>
      </View>

      {/* 🚀 CONDITIONAL RENDER: EMPTY STATE VS FULL CART */}
      {cartItems.length === 0 ? (
        // ==================== EMPTY CART STATE ====================
        <View className="flex-1 justify-center items-center px-6 pb-12">
          {/* Basket Icon Wrapper container */}
          <View className="bg-orange-50 dark:bg-orange-500/10 p-6 rounded-full mb-5">
            <Feather name="shopping-bag" size={48} color="#FF7518" />
          </View>

          <Text className="text-xl w-52 ml-6 font-black text-slate-900 dark:text-white ">
            Your cart is empty
          </Text>
          
          <Text className="text-sm font-medium text-slate-400 dark:text-slate-500 text-center mt-2 max-w-[260px] leading-relaxed">
            Looks like you haven&apos;t added any 3D models or custom orders to your cart yet.
          </Text>

          {/* Start Shopping Button links directly to the Explore tab */}
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/explore')}
            style={primaryButtonShadow}
            className="bg-primary px-8 py-3.5 rounded-xl mt-8 flex-row items-center active:opacity-90"
          >
            <Text className="text-white font-bold text-sm mr-2">Start Shopping</Text>
            <Feather name="arrow-right" size={14} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        // ==================== ACTIVE CART LIST ====================
        <ScrollView 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          className="flex-1 px-4"
        >
          {/* CART ITEMS LIST */}
          <View className="mt-4">
            {cartItems.map((item) => (
              <View 
                key={item.id}
                style={cardShadow}
                className="flex-row bg-white dark:bg-secondary p-3 rounded-2xl mb-3 items-center border border-slate-50 dark:border-slate-700/50"
              >
                <Image 
                  source={{ uri: item.image }} 
                  className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-700" 
                  resizeMode="cover"
                />

                <View className="flex-1 ml-3 justify-center">
                  <Text className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {item.category}
                  </Text>
                  <Text numberOfLines={1} className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {item.title}
                  </Text>
                  <Text className="text-base font-black text-primary mt-1">
                    ${item.price.toFixed(2)}
                  </Text>
                </View>

                <View className="items-end justify-between h-20 py-0.5">
                  <TouchableOpacity onPress={() => removeItem(item.id)} className="p-1">
                    <Feather name="trash-2" size={16} color="#EF4444" />
                  </TouchableOpacity>

                  <View className="flex-row items-center bg-slate-50 dark:bg-slate-700/60 rounded-xl p-1 border border-slate-100 dark:border-slate-600">
                    <TouchableOpacity 
                      onPress={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 items-center justify-center rounded-lg bg-white dark:bg-slate-600 shadow-sm active:opacity-70"
                    >
                      <Feather name="minus" size={12} className="text-slate-900 dark:text-white" />
                    </TouchableOpacity>

                    <Text className="mx-2.5 font-bold text-sm text-slate-900 dark:text-white min-w-[14px] text-center">
                      {item.quantity}
                    </Text>

                    <TouchableOpacity 
                      onPress={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 items-center justify-center rounded-lg bg-white dark:bg-slate-600 shadow-sm active:opacity-70"
                    >
                      <Feather name="plus" size={12} className="text-slate-900 dark:text-white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* PROMO CODE SECTION */}
          <View style={cardShadow} className="bg-white dark:bg-secondary p-3 rounded-2xl mt-2 flex-row border border-slate-50 dark:border-slate-700/50">
            <TextInput
              placeholder="Promo Code"
              placeholderTextColor="#94A3B8"
              value={promoCode}
              onChangeText={setPromoCode}
              className="flex-1 bg-slate-50 dark:bg-slate-700/50 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-900 dark:text-white border border-transparent mr-2"
            />
            <TouchableOpacity className="bg-slate-900 dark:bg-slate-700 px-5 justify-center items-center rounded-xl active:opacity-90">
              <Text className="text-white font-bold text-xs uppercase tracking-wider">Apply</Text>
            </TouchableOpacity>
          </View>

          {/* ORDER SUMMARY */}
          <View style={cardShadow} className="bg-white dark:bg-secondary p-4 rounded-2xl mt-4 border border-slate-50 dark:border-slate-700/50">
            <Text className="text-sm font-black text-slate-900 dark:text-white mb-3 tracking-tight">Order Summary</Text>
            
            <View className="flex-row justify-between items-center mb-2.5">
              <Text className="text-sm font-medium text-slate-400 dark:text-slate-500">Subtotal</Text>
              <Text className="text-sm font-bold text-slate-800 dark:text-white">${subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-dashed border-slate-100 dark:border-slate-700">
              <Text className="text-sm font-medium text-slate-400 dark:text-slate-500">Shipping Estimate</Text>
              <Text className="text-sm font-bold text-slate-800 dark:text-white">${shipping.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-1">
              <Text className="text-base font-bold text-slate-900 dark:text-white">Order Total</Text>
              <Text className="text-xl font-black text-primary">${total.toFixed(2)}</Text>
            </View>
          </View>

          {/* CHECKOUT ACTION BUTTON */}
          <TouchableOpacity 
            style={primaryButtonShadow}
            className="bg-primary flex-row items-center justify-center py-4 rounded-xl mt-6 active:opacity-95"
          >
            <Feather name="credit-card" size={18} color="white" style={{ marginRight: 8 }} />
            <Text className="text-white font-bold text-base">Proceed to Checkout</Text>
          </TouchableOpacity>

          <View className="h-16" />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
