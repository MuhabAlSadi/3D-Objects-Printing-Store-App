// components/ProductCard.tsx
import { useColorScheme } from 'nativewind';
import React from 'react';
import GridViewCard from './GridViewCard';
import ListViewCard from './ListViewCard';

interface ProductCardProps {
  
  view: 'Grid' | 'List';
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

export default function ProductCard({ product, view }: ProductCardProps) {
  const isNew = product.isNew;
  const isSale = product.isDiscounted; // Handles your dataset's discount property

  const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';


    if (view === 'Grid') {
      return (
       <GridViewCard product={product} isNew={isNew} isSale={isSale} isDark={isDark} />
      );
    }

    // Otherwise, return the full-width list row layout
    return (
      <ListViewCard product={product} isNew={isNew} isSale={isSale} isDark={isDark} />
    );
}