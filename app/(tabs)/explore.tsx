import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { ExploreHeader } from '../components/ExploreHeader';
import ProductCard from '../components/shared/ProductCard';
import { products } from '../data/products';


const CATEGORIES = ['All', 'Free', 'Paid', 'Art', 'Toys', 'Gadgets', 'Tools', 'Architecture'];

export default function ExploreScreen() {
  // State Controllers
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState('Popular');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  // Filter & Sort Engine
  const displayProducts = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Free') return item.isFree && matchesSearch;
    if (selectedCategory === 'Paid') return !item.isFree && matchesSearch;
    return item.category.toLowerCase() === selectedCategory.toLowerCase() && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'Popular':
        return b.views - a.views;
      case 'Top Rated':
        return b.rating - a.rating;
      case 'Price: Low':
        return (a.isFree ? 0 : a.price) - (b.isFree ? 0 : b.price);
      case 'Price: High':
        return (b.isFree ? 0 : b.price) - (a.isFree ? 0 : a.price);
      default:
        return 0;
    }
  });

  return (
    <View className="flex-1 bg-white dark:bg-backgrounddark">
      <FlatList
        key={isGridView ? 'GRID_VIEW' : 'LIST_VIEW'}
        data={displayProducts}
        numColumns={isGridView ? 2 : 1}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <ExploreHeader
            isGridView={isGridView}
            setIsGridView={setIsGridView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            displayProductsLength={displayProducts.length}
            sortBy={sortBy}
            setSortBy={setSortBy} // ◄ Passed Down Safely
            isSortMenuOpen={isSortMenuOpen} // ◄ Passed Down Safely
            setIsSortMenuOpen={setIsSortMenuOpen}
          />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-2">
            <ProductCard view={isGridView ? 'Grid' : 'List'} product={item} />
          </View>
        )}
      />
    </View>
  );
}