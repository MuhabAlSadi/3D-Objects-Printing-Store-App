import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ProductCard from './ProductCard';

type ProductRowSectionProps = {
  title: string;
  items: any[];
  badgeCount?: number;
  promoLabel?: string;
  isHot?: boolean;
};

export default function ProductRowSection({ title, items, badgeCount, promoLabel, isHot }: ProductRowSectionProps) {
  return (
    <View className="mt-8">
      <View className="px-4 flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Text className="text-lg font-bold text-gray-900">{title}</Text>
          {typeof badgeCount === 'number' && badgeCount > 0 && (
            <View className="bg-blue-50 px-2 py-0.5 rounded-full ml-2 border border-blue-100">
              <Text className="text-blue-600 text-xs font-bold">{badgeCount}</Text>
            </View>
          )}
          {promoLabel && (
            <View className="bg-rose-50 px-2 py-0.5 rounded-md ml-2 border border-rose-100">
              <Text className="text-rose-600 text-[10px] font-extrabold uppercase tracking-wider">{promoLabel}</Text>
            </View>
          )}
          {isHot && <Text className="ml-1.5 text-base">🔥</Text>}
        </View>
        <TouchableOpacity>
          <Text className="text-blue-600 font-semibold text-xs flex-row items-center">View All <Feather name="chevron-right" size={12} /></Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {items.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  );
}