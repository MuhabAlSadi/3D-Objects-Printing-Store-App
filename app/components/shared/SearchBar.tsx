// components/shared/SearchBar.tsx
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  placeholderText?: string;
}

export default function SearchBar({ searchQuery, setSearchQuery, isFocused, setIsFocused, placeholderText }: SearchBarProps) {
  return (
    // 🚀 REMOVED: Extra wrapper padding/margins to let it align perfectly with parent boundaries
    <View 
      className={`flex-row items-center bg-gray-100 dark:bg-slate-800 px-4 py-3 shadow-sm rounded-xl border mt-4 ${
        isFocused ? 'border-primary' : 'border-transparent'
      }`}
    >
      <Feather name="search" size={18} color="#A0AEC0" />
      
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholderText || "Search 3D models..."}
        placeholderTextColor="#94A3B8"
        value={searchQuery}
        onChangeText={setSearchQuery}
        // 🚀 CHANGED: Swapped p-0 for px-2 to prevent typing clipping bugs
        className="flex-1 text-slate-900 dark:text-white font-medium text-sm px-2 py-0"
      />
      
      {/* DYNAMIC CLEAR BUTTON */}
      {searchQuery.length > 0 && (
        <TouchableOpacity
          onPress={() => setSearchQuery('')}
          className="active:opacity-70 p-0.5"
        >
          <Feather name="x-circle" size={18} color="#94A3B8" />
        </TouchableOpacity>
      )}
    </View>
  );
}