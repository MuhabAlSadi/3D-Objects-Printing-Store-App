import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

const CATEGORIES = ['All', 'Free', 'Paid', 'Art', 'Toys', 'Gadgets', 'Tools', 'Architecture'];


interface ExploreCategoriesListProps {
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
}


export default function ExploreCategoriesList({ selectedCategory, setSelectedCategory }: ExploreCategoriesListProps) {
    return (
        <FlatList
            horizontal
            data={CATEGORIES}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            className="mb-5"
            renderItem={({ item }) => {
                const isActive = selectedCategory === item;
                return (
                    <TouchableOpacity
                        onPress={() => setSelectedCategory(item)}
                        className={`px-4 py-2 rounded-[6px] mr-2.5 ${isActive ? 'bg-[#FF7518]' : 'bg-slate-100 dark:bg-slate-800'
                            }`}
                    >
                        <Text className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                );
            }}
        />
    );
}