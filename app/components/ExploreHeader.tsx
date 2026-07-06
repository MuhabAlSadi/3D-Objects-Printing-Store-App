import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/shared/SearchBar';
import ExploreCategoriesList from './ExploreCategoriesList';
import ExporeTopBar from './ExploreTopBar';
import FilterAndSortBar from './FilterAndSortBar';


interface HeaderSectionsProps {
    isGridView: boolean;
    setIsGridView: (val: boolean) => void;
    searchQuery: string;
    setSearchQuery: (text: string) => void;
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    displayProductsLength: number; // ◄ Cleared variable conflict
    sortBy: string;
    setSortBy: (sort: string) => void; // ◄ Added this so the modal can save changes
    isSortMenuOpen: boolean; // ◄ Added to track open state safely
    setIsSortMenuOpen: (open: boolean) => void;
}

export function ExploreHeader({
    isGridView,
    setIsGridView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    displayProductsLength,
    sortBy,
    setSortBy,
    isSortMenuOpen,
    setIsSortMenuOpen
}: HeaderSectionsProps) {

    const insets = useSafeAreaInsets();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="pb-4">
            <View style={{ paddingTop: insets.top }} className="px-4 bg-white dark:bg-secondary pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B]" >

                {/* 1. TOP BAR: TITLE & TOGGLE BUTTONS */}
                <ExporeTopBar
                    setIsGridView={setIsGridView}
                    isGridView={isGridView}
                />

                {/* 2. Search Bar */}
                <View className=" mb-4">
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        isFocused={isFocused}
                        setIsFocused={setIsFocused}
                        placeholderText="Search creators & blueprints..."
                    />
                </View>


                {/* 3. HORIZONTAL CATEGORIES PILLS LIST */}
                <ExploreCategoriesList
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </View>

            {/* 4. FILTER COUNTER & MODAL DROPDOWN SORT ACTION */}
            <FilterAndSortBar
                displayProductsLength={displayProductsLength}
                setIsSortMenuOpen={setIsSortMenuOpen}
                sortBy={sortBy}
                isSortMenuOpen={isSortMenuOpen}
                setSortBy={setSortBy} />
        </View>
    );
}