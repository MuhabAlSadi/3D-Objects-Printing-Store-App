// components/ProductCard.tsx
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function ProductCard({ product }: { product: any }) {
  const isNew = product.isNew;
  const isSale = product.isDiscounted; // Handles your dataset's discount property

  return (
    <View className="bg-white w-[184px] rounded-[12px] border border-gray-100 shadow-sm mr-4 overflow-hidden mb-2">
      
      {/* 1. IMAGE CONTAINER */}
      <View className="h-44 bg-gray-50 relative">
        <Image 
          source={{ uri: product.image }} 
          className="w-full h-full object-cover"
        />
        
        {/* Floating Badge (Prioritizes 'Sale' if discounted, otherwise shows 'New') */}
        {(isNew || isSale) && (
          <View className="absolute top-3 left-3">
            <View className={`px-3 py-1 rounded-[6px] ${isSale ? 'bg-[#D50000]' : 'bg-[#00C853]'}`}>
              <Text className="text-white text-[11px] font-black tracking-wide">
                {isSale ? 'Sale' : 'New'}
              </Text>
            </View>
          </View>
        )}

        {/* Favorite/Heart Overlay Button */}
        <TouchableOpacity className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm">
          <Feather name="heart" size={16} color="#4A5568" />
        </TouchableOpacity>
      </View>

      {/* 2. DESCRIPTION META SECTION */}
      <View className="p-3.5 pt-3">
        {/* Product Title */}
        <Text className="text-gray-900 text-[15px] font-bold tracking-tight" numberOfLines={1}>
          {product.name}
        </Text>
        
        {/* Category/Type */}
        <Text className="text-gray-500 text-xs font-semibold mt-0.5">
          {product.category}
        </Text>

        {/* Ratings & Downloads Row */}
        <View className="flex-row items-center mt-2">
          {/* Star Rating */}
          <View className="flex-row items-center mr-3">
            <Feather name="star" size={13} color="#FFC107" fill="#FFC107" />
            <Text className="text-gray-800 text-xs font-bold ml-1">{product.rating}</Text>
          </View>
          
          {/* Download Count */}
          <View className="flex-row items-center">
            <Feather name="download" size={12} color="#718096" />
            <Text className="text-gray-500 text-xs font-medium ml-1">{product.downloads}</Text>
          </View>
        </View>

        {/* 3. PRICE & CART ACTION TRIGGER FOOTER */}
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-col">
            {/* Displaying Current Price or Free */}
            <Text className="text-gray-900 text-[17px] font-extrabold tracking-tight">
              {product.isFree ? 'Free' : `$${product.price.toFixed(2)}`}
            </Text>
            {/* Corrected to handle originalPrice wrapper */}
            {isSale && product.originalPrice && (
              <Text className="text-gray-400 text-xs font-medium line-through -mt-1">
                {`$${product.originalPrice.toFixed(2)}`}
              </Text>
            )}
          </View>
          
          {/* Modern Add Button */}
          <TouchableOpacity className="bg-[#030712] px-3.5 py-2 rounded-[6px] flex-row items-center">
            <Feather name="shopping-cart" size={13} color="#FFFFFF" />
            <Text className="text-white font-bold text-xs ml-2">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}