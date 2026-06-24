import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


interface GridViewCardProps {

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

export default function GridViewCard({ product, isNew, isSale, isDark }: GridViewCardProps) {
    return (
        <View className="bg-white dark:bg-secondary w-[184px] rounded-[12px] border border-gray-100 dark:border-secondary shadow-sm  overflow-hidden mb-2 ">

            {/* 1. IMAGE CONTAINER  */}
            <View className="h-44 bg-gray-50 relative">
                <Image
                    source={{ uri: product.image }}
                    className="w-full h-full object-cover"
                    resizeMode="cover"
                />

                {/* Floating Badge (Prioritizes 'Sale' if discounted, otherwise shows 'New') */}
                {(isNew || isSale) && (
                    <View className="absolute top-3 left-3">
                        <View className={`px-3 py-1 rounded-[6px] ${isSale ? 'bg-[#ff4e4e]' : 'bg-[#4ce08a]'}`}>
                            <Text className="text-white text-[11px] font-black tracking-wide">
                                {isSale ? 'Sale' : 'New'}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Favorite/Heart Overlay Button */}
                <TouchableOpacity className="absolute top-3 right-3 bg-white dark:bg-[#334155] p-2 rounded-full shadow-sm">
                    <Feather name="heart" size={16} color={isDark ? 'white' : "#4A5568"} />
                </TouchableOpacity>
            </View>

            {/* 2. DESCRIPTION META SECTION */}
            <View className="p-3.5 pt-3">
                {/* Product Title */}
                <Text className="text-gray-900 dark:text-[#F8FAFC] text-[15px] font-bold tracking-tight" numberOfLines={1}>
                    {product.name}
                </Text>

                {/* Category/Type */}
                <Text className="text-primary text-xs font-semibold mt-0.5">
                    {product.category}
                </Text>

                {/* Ratings & Downloads Row */}
                <View className="flex-row items-center mt-2">
                    {/* Star Rating */}
                    <View className="flex-row items-center mr-3">
                        <FontAwesome name="star" size={13} color="#FFC107" />
                        <Text className="text-gray-800 dark:text-gray-300 text-xs font-bold ml-1">{product.rating}</Text>
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
                        {product.isFree ? <Text className="text-green-500  text-[17px] font-extrabold tracking-tight">Free</Text> : <Text className="text-gray-900 dark:text-white text-[17px] font-extrabold tracking-tight">${product.price.toFixed(2)}</Text>}


                        {/* Corrected to handle originalPrice wrapper */}
                        {isSale && product.originalPrice && (
                            <Text className="text-gray-400  text-xs font-medium line-through -mt-1">
                                {`$${product.originalPrice.toFixed(2)}`}
                            </Text>
                        )}
                    </View>

                    {/* Modern Add Button */}
                    <TouchableOpacity className="bg-white dark:bg-primary px-3.5 py-2 border border-primary rounded-[6px] flex-row items-center">
                        <Feather name="shopping-cart" size={13} color={isDark ? 'black' : "#FF7518"} />
                        <Text className="text-primary dark:text-black font-bold text-xs ml-2">Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}