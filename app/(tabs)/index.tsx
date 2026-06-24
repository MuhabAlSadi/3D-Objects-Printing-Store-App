// app/(tabs)/index.tsx
import { Feather } from '@expo/vector-icons';

import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ExploreMore from '../components/ExploreMore';
import ProductRowSection from '../components/ProductRowSection';
import SearchBar from '../components/shared/SearchBar';
import Slideshow from '../components/Slideshow';
import { CAROUSEL_OFFERS } from '../data/carousel_offers';
import { products } from '../data/products';


export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [isFocused, setIsFocused] = useState(false);
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

  const handleScroll = (event: any) => {
    const rawIndex = event.nativeEvent.contentOffset.x / width;
    const slide = Math.min(
      CAROUSEL_OFFERS.length - 1,
      Math.max(0, Math.round(rawIndex))
    );
    if (slide !== activeSlide) setActiveSlide(slide);
  };

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextSlide = activeSlide + 1;
      if (nextSlide >= CAROUSEL_OFFERS.length) {
        nextSlide = 0;
      }

      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });

      setActiveSlide(nextSlide);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeSlide, width]);

  return (
    <ScrollView
      className="flex-1 bg-backgroundlight dark:bg-[#1E293B]"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* HEADER SECTION CONTEXT BOX */}
      <View style={{ paddingTop: insets.top }} className="bg-white dark:bg-[#334155] pb-5 border-b border-[#E2E8F0] dark:border-[#1E293B]">
        {/* TOP METRICS ROW BAR */}
        <View className="px-4 pt-4 flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">PrintHub</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-300 font-medium mt-0.5">3D Print Store</Text>
          </View>
          <TouchableOpacity className="p-2.5 bg-white dark:bg-secondary rounded-full border border-gray-100 dark:border-gray-600 shadow-sm">
            <Feather name="bell" size={20} color={isDark ? 'white' : "#1A202C"} />
          </TouchableOpacity>
        </View>

        {/*SEARCH BAR ELEMENT */}
        <View className="px-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            placeholderText="Search 3D models..."
          />
        </View>
      </View>

      {/* BANNER SLIDESHOW CAROUSEL DECK */}
      <Slideshow
        scrollViewRef={scrollViewRef}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        width={width}
        handleScroll={handleScroll}
      />

      {/* DISPLAY SECTIONS DOCKS */}
      <ProductRowSection
        title="New Arrivals"
        items={filteredProducts.filter(p => p.isNew)}
        badgeCount={filteredProducts.filter(p => p.isNew).length}
      />

      <ProductRowSection
        title="On Sale"
        items={filteredProducts.filter(p => p.isDiscounted)}
        promoLabel="Up to 40% OFF"
      />

      <ProductRowSection
        title="Suggestions"
        items={filteredProducts.filter(p => p.isDiscounted)}
      />

      <ProductRowSection
        title="Trending Now"
        items={filteredProducts.filter(p => p.isTrending)}
        isHot={true}
      />

      <ProductRowSection
        title="Most Viewed"
        items={[...filteredProducts].sort((a, b) => b.views - a.views)}
      />

      {/* Explore More Models ROUTING ACTION BAR LINK */}
      <ExploreMore />

      <View className="h-12" />
    </ScrollView>
  );
}