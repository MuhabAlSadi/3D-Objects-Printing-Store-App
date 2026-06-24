import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ExploreTopBarProps {
    setIsGridView: (val: boolean) => void;
    isGridView: boolean;
}


export default function ExploreTopBar({setIsGridView, isGridView}:ExploreTopBarProps) {
    return (
        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Explore Ideas
                            </Text>
        
                            <View className="flex-row bg-slate-100 dark:bg-slate-800 p-1 rounded-xl space-x-1">
                                <TouchableOpacity
                                    onPress={() => setIsGridView(true)}
                                    className={`p-2 rounded-lg ${isGridView ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                                >
                                    <Feather name="grid" size={16} color={isGridView ? '#FF7518' : '#64748B'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setIsGridView(false)}
                                    className={`p-2 rounded-lg ${!isGridView ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                                >
                                    <Feather name="list" size={16} color={!isGridView ? '#FF7518' : '#64748B'} />
                                </TouchableOpacity>
                            </View>
                        </View>
    );
}