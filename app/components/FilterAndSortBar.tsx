import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';


interface FilterAndSortBarProps {
    displayProductsLength: number;
    setIsSortMenuOpen: (open: boolean) => void;
    sortBy: string;
    isSortMenuOpen: boolean;
    setSortBy: (sort: string) => void;
}



export default function FilterAndSortBar({displayProductsLength, setIsSortMenuOpen, sortBy, isSortMenuOpen, setSortBy }: FilterAndSortBarProps) {
    return (
        <View className="flex-row justify-between items-center px-4 py-3 z-50">
                <Text className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    {displayProductsLength} Models Found {/* ◄ Fixed prop binding */}
                </Text>

                <View>
                    <TouchableOpacity
                        onPress={() => setIsSortMenuOpen(true)}
                        className="flex-row items-center bg-slate-100 dark:bg-secondary px-4 py-2 rounded-xl active:opacity-75"
                    >
                        <Text className="text-sm font-bold text-slate-700 dark:text-slate-300 mr-1">
                            Sort: {sortBy} {/* ◄ Fixed prop binding */}
                        </Text>
                        <Feather name="chevron-down" size={14} color="#64748B" />
                    </TouchableOpacity>

                    <Modal
                        visible={isSortMenuOpen} // ◄ Fixed prop binding
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setIsSortMenuOpen(false)}
                    >
                        <TouchableWithoutFeedback onPress={() => setIsSortMenuOpen(false)}>
                            <View className="flex-1 bg-black/5 justify-start items-end pt-52 pr-4">
                                <View className="bg-white dark:bg-slate-900 w-44 rounded-2xl p-2 shadow-xl border border-slate-100 dark:border-slate-800">
                                    {['Popular', 'Top Rated', 'Price: Low', 'Price: High'].map((option) => {
                                        const isSelected = sortBy === option;
                                        return (
                                            <TouchableOpacity
                                                key={option}
                                                onPress={() => {
                                                    setSortBy(option); // ◄ Works perfectly now
                                                    setIsSortMenuOpen(false);
                                                }}
                                                className={`flex-row justify-between items-center px-3 py-2.5 rounded-xl ${isSelected ? 'bg-orange-50/60 dark:bg-orange-500/10' : ''
                                                    }`}
                                            >
                                                <Text className={`text-sm font-medium ${isSelected ? 'text-[#FF7518] font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                                                    {option}
                                                </Text>
                                                {isSelected && <Feather name="check" size={14} color="#FF7518" />}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </View>
    );
}