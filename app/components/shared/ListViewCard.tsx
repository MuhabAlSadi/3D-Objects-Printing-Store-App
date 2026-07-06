import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ListViewCardProps {

    isNew?: boolean;
    isDark: boolean;
    isSale?: boolean;
    product: {
        id: string;
        name: string;
        category: string;
        image: string;
        rating: number;
        downloads?: number;
        price: number;
        isFree: boolean;
        isNew?: boolean;
        isDiscounted?: boolean;
        originalPrice?: number;
        isTrending?: boolean;
    };
}

export default function ListViewCard({ product, isNew, isSale, isDark }: ListViewCardProps){
    

return (
    <TouchableOpacity 
  className="flex-row bg-white dark:bg-slate-900 rounded-[8px] mb-4 border border-slate-100 dark:border-slate-800 shadow-sm items-center"
  activeOpacity={0.8}
>
  {/* LEFT SIDE: IMAGE WITH DYNAMIC 'NEW' BADGE & ONLY LEFT CORNERS ROUNDED */}
  <View className="w-36 h-36 bg-slate-100 dark:bg-slate-800 rounded-l-[8px] relative overflow-hidden">
    <Image 
      source={{ uri: product.image }} 
      style={{ width: '100%', height: '100%' }} // Replaced text classes with styles for perfect native expo-image layout mapping
      
    />
    
    {/* 'New' / 'Sale' Badge wrapper */}
    {(isNew || isSale) && (
      <View className="absolute top-3 left-3">
        <View className={`px-3 py-1 rounded-[6px] ${isSale ? 'bg-[#ff4e4e]' : 'bg-[#4ce08a]'}`}>
          <Text className="text-white text-[11px] font-black tracking-wide">
            {isSale ? 'Sale' : 'New'}
          </Text>
        </View>
      </View>
    )}
  </View>
  
  {/* RIGHT SIDE: METADATA INFOBAR CONTENT */}
  <View className="flex-1 py-3 px-4 h-36 justify-between">
    <View>
      {/* Title */}
      <Text 
        numberOfLines={1} 
        className=" text-lg font-black text-slate-800 dark:text-white tracking-tight"
      >
        {product.name}
      </Text>
      
      {/* Category Subtitle */}
      <Text className="text-[13px] font-semibold text-primary mt-0.5">
        {product.category}
      </Text>

      {/* Rating and Download Stats Counter */}
      <View className="flex-row items-center mt-2 space-x-2">
        <View className="flex-row items-center">
          <FontAwesome name="star" size={13} color="#FFC107" />
          <Text className="text-xs font-bold text-slate-600 dark:text-slate-400 mx-2">
            {product.rating}
          </Text>
        </View>
      
        <View className="flex-row items-center space-x-1">
          <Feather name="download" size={12} color="#64748B" />
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 mx-1.5">
            {product.downloads ?? 0}
          </Text>
        </View>
      </View>
    </View>

    {/* BOTTOM CONTAINER ROW: PRICE & BUTTON */}
    <View className="flex-row justify-between items-end">
      {/* Price Label */}
      <Text className="text-lg font-black text-slate-900 dark:text-white">
        {product.isFree ? (
          <Text className="text-green-500 text-[17px] font-extrabold tracking-tight">Free</Text>
        ) : (
          <Text className="text-gray-900 dark:text-white text-[17px] font-extrabold tracking-tight">
            ${product.price.toFixed(2)}
          </Text>
        )}
      </Text>

      {/* Action Add Button Box */}
      <TouchableOpacity className="bg-white dark:bg-primary px-3.5 py-2 border border-primary rounded-[6px] flex-row items-center">
        <Feather name="shopping-cart" size={13} color={isDark ? 'black' : "#FF7518"} />
        <Text className="text-primary dark:text-black font-bold text-xs ml-2">Add</Text>
      </TouchableOpacity>
    </View>
  </View>
</TouchableOpacity>
);
}