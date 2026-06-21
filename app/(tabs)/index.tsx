import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CAROUSEL_OFFERS } from '../data/carousel_offers';
import { products } from '../data/products';

import { useColorScheme } from 'nativewind';
import ProductRowSection from '../components/ProductRowSection';

import { Link } from 'expo-router';


const { width } = Dimensions.get('window');


export default function HomeScreen() {
  const insets = useSafeAreaInsets();

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
    const rawIndex = event.nativeEvent.contentOffset.x / width; // Divide by full screen width
    const slide = Math.min(
      CAROUSEL_OFFERS.length - 1,
      Math.max(0, Math.round(rawIndex))
    );
    if (slide !== activeSlide) setActiveSlide(slide);
  };


  const scrollViewRef = useRef<ScrollView>(null); // Gives us programmatic control over the scrolling

  useEffect(() => {
    const timer = setInterval(() => {
      let nextSlide = activeSlide + 1;

      // Loop back to the first slide if we hit the end of your CAROUSEL_OFFERS array
      if (nextSlide >= CAROUSEL_OFFERS.length) {
        nextSlide = 0;
      }

      // Programmatically slide the ScrollView smoothly to the next page width position
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width, // ◄ Multiply by the full screen step interval width
        animated: true,
      });

      setActiveSlide(nextSlide);
    }, 3000); // 3000ms = 3 seconds

    // Clean up the timer whenever activeSlide changes or unmounts to prevent speed accumulation bugs
    return () => clearInterval(timer);
  }, [activeSlide]);

  return (
    <ScrollView
      className="flex-1 bg-backgroundlight dark:bg-[#1E293B] "
      showsVerticalScrollIndicator={false}
      style={{ paddingTop: insets.top }}
    >
      <View className="bg-white dark:bg-[#334155] pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B] " >
        {/* HEADER SECTION */}
        <View className="px-4 pt-4 flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">PrintHub</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-300 font-medium mt-0.5">3D Print Store</Text>
          </View>
          <TouchableOpacity className="p-2.5 bg-white dark:bg-secondary rounded-full border border-gray-100 dark:border-gray-600 shadow-sm">
            <Feather name="bell" size={20} color={isDark ? 'white' : "#1A202C"} />
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR CONTAINER */}
        <View className="px-4 mt-5 ">
          <View className={`flex-row items-center bg-gray-100 dark:bg-slate-800 px-4 py-3 shadow-sm rounded-xl border  ${isFocused ? 'border-primary' : 'border-transparent'
            }`} >
            <Feather name="search" size={18} color="#A0AEC0" />
            <TextInput
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search 3D models..."
              placeholderTextColor="#A0AEC0"

              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      {/* BANNER SLIDESHOW (CAROUSEL) */}
      <View className="mt-6">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          pagingEnabled={true} // ◄ Injects native full-page snapping alignment logic
        >
          {CAROUSEL_OFFERS.map((offer, idx) => (
            /* 1. New Outer Wrapper matching full screen width with horizontal padding */
            <View key={offer.id} style={{ width: width }} className="px-4">

              {/* 2. Your actual beautiful slide card background face (No manual widths or external margins needed!) */}
              <View className={`${offer.bg} p-6 rounded-2xl flex-col justify-between h-44 shadow-sm`}>
                <View>
                  <Text className="text-white text-xs font-semibold opacity-80 uppercase tracking-wider">{offer.subtitle}</Text>
                  <Text className="text-white text-2xl font-black mt-1 leading-tight">{offer.title}</Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row space-x-1">
                    {CAROUSEL_OFFERS.map((_, idxInner) => (
                      <View
                        key={idxInner}
                        className={`h-1.5 rounded-full transition-all duration-200 ${idxInner === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/40'} ${idxInner > 0 ? 'ml-1' : ''}`}
                      />
                    ))}
                  </View>
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

      <ProductRowSection
        title="Suggestions "
        items={filteredProducts.filter(p => p.isDiscounted)}

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
      <Link href="/explore" asChild>
        <TouchableOpacity className='flex-row items-center justify-center bg-[#334155] dark:border-2 dark:border-primary rounded-[10px] px-6 py-10 mx-6 my-10 '>
          <View>
            <Text className="text-primary text-[25px] text-center">
              Explore More
            </Text>
            <Text className="text-primary text-[25px] text-center">
              Models
            </Text>
          </View>
          <Feather className="ml-8  " name="compass" size={72} color='#FF7518' />
        </TouchableOpacity>
      </Link>

      {/* Padding space at bottom so navigation doesn't block the last elements */}
      <View className="h-12" />
    </ScrollView>
  );
}