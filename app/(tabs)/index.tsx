import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CAROUSEL_OFFERS } from '../data/carousel_offers';
import { products } from '../data/products';

import ProductRowSection from '../components/ProductRowSection';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = products.filter((p) => {
    if (!normalizedQuery) return true;
    return (
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery)
    );
  });

  // Handle Carousel indicator dot changes
  const handleScroll = (event: any) => {
    const pageWidth = width - 32;
    const rawIndex = event.nativeEvent.contentOffset.x / pageWidth;
    const slide = Math.min(
      CAROUSEL_OFFERS.length - 1,
      Math.max(0, Math.round(rawIndex))
    );
    if (slide !== activeSlide) setActiveSlide(slide);
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
      style={{ paddingTop: insets.top }}
    >
      {/* HEADER SECTION */}
      <View className="px-4 pt-4 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-gray-900 tracking-tight">PrintHub</Text>
          <Text className="text-xs text-gray-500 font-medium mt-0.5">3D Print Store</Text>
        </View>
        <TouchableOpacity className="p-2.5 bg-white rounded-full border border-gray-100 shadow-sm">
          <Feather name="bell" size={20} color="#1A202C" />
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR CONTAINER */}
      <View className="px-4 mt-5">
        <View className="flex-row items-center bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
          <Feather name="search" size={18} color="#A0AEC0" />
          <TextInput
            placeholder="Search 3D models..."
            placeholderTextColor="#A0AEC0"
            className="flex-1 ml-3 text-gray-800 text-sm font-medium"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* BANNER SLIDESHOW (CAROUSEL) */}
      <View className="mt-6">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {CAROUSEL_OFFERS.map((offer) => (
            <View
              key={offer.id}
              style={{ width: width - 32 }}
              className={`${offer.bg} p-6 rounded-2xl mr-4 flex-col justify-between h-40 shadow-sm`}
            >
              <View>
                <Text className="text-white text-2xl font-bold tracking-wide">{offer.title}</Text>
                <Text className="text-blue-100 text-xs font-medium mt-1.5 max-w-[80%]">{offer.subtitle}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row space-x-1">
                  {CAROUSEL_OFFERS.map((_, idx) => (
                    <View
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-200 ${idx === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/40'} ${idx > 0 ? 'ml-1' : ''}`}
                    />
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 1. NEW ARRIVALS */}
      <ProductRowSection
        title="New Arrivals"
        items={filteredProducts.filter(p => p.isNew)}
        badgeCount={filteredProducts.filter(p => p.isNew).length}
      />

      {/* 2. ON SALE (Updated to use isDiscounted property!) */}
      <ProductRowSection
        title="On Sale"
        items={filteredProducts.filter(p => p.isDiscounted)}
        promoLabel="Up to 40% OFF"
      />

      {/* 3. TRENDING NOW */}
      <ProductRowSection
        title="Trending Now"
        items={filteredProducts.filter(p => p.isTrending)}
        isHot={true}
      />

      {/* 4. MOST VIEWED (Sorts items beautifully based on views) */}
      <ProductRowSection
        title="Most Viewed"
        items={[...filteredProducts].sort((a, b) => b.views - a.views)}
      />

      {/* Padding space at bottom so navigation doesn't block the last elements */}
      <View className="h-12" />
    </ScrollView>
  );
}