import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CAROUSEL_OFFERS } from '../data/carousel_offers';

interface SlideshowProps {
  // 🚀 UPDATED: Changed from React.RefObject<ScrollView> to this:
  scrollViewRef: React.Ref<ScrollView>; 
  activeSlide: number;
  setActiveSlide: (slide: number) => void;
  width: number;
  handleScroll: (event: any) => void; // Using any here balances parent event variants seamlessly
}

export default function Slideshow({
  scrollViewRef,
  activeSlide,
  setActiveSlide,
  width,
  handleScroll
}: SlideshowProps) {
  return (
    <View className="mt-6">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled={true}
      >
        {CAROUSEL_OFFERS.map((offer) => (
          <View key={offer.id} style={{ width: width }} className="px-4">
            <View className={`${offer.bg} p-6 rounded-2xl flex-col justify-between h-44 shadow-sm`}>
              <View>
                <Text className="text-white text-xs font-semibold opacity-80 uppercase tracking-wider">
                  {offer.subtitle}
                </Text>
                <Text className="text-white text-2xl font-black mt-1 leading-tight">
                  {offer.title}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row space-x-1">
                  {CAROUSEL_OFFERS.map((_, idxInner) => (
                    <View
                      key={idxInner}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        idxInner === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                      } ${idxInner > 0 ? 'ml-1' : ''}`}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}