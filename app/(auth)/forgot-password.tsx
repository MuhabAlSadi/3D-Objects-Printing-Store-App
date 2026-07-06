import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const placeholderColor = isDark ? '#64748B' : '#94A3B8';

  const handleSubmit = async () => {
    setEmailError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    setIsSubmitting(true);
    const result = await forgotPassword(email.trim());
    setIsSubmitting(false);

    if (result.success) {
      router.push({
        pathname: '/(auth)/otp' as any,
        params: { email: email.trim(), type: 'reset' },
      });
    } else {
      setEmailError(result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-backgroundlight dark:bg-[#1E293B]"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: insets.top }}
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6"
      >
        {/* BACK BUTTON */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white dark:bg-secondary items-center justify-center mt-4 border border-slate-100 dark:border-slate-700/50"
        >
          <Feather name="arrow-left" size={18} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>

        {/* HEADER */}
        <View className="mt-8 mb-10">
          <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center mb-5">
            <Feather name="lock" size={28} color="white" />
          </View>
          <Text className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Forgot Password?
          </Text>
          <Text className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-1.5">
            Enter your email and we&apos;ll send you a reset code
          </Text>
        </View>

        {/* EMAIL INPUT */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
            Email
          </Text>
          <View
            className={`flex-row items-center bg-white dark:bg-secondary rounded-2xl px-4 border ${
              emailError ? 'border-red-400 dark:border-red-500' : 'border-slate-100 dark:border-slate-700/50'
            }`}
          >
            <Feather name="mail" size={18} color={emailError ? '#EF4444' : placeholderColor} />
            <TextInput
              value={email}
              onChangeText={(text) => { setEmail(text); if (emailError) setEmailError(''); }}
              placeholder="you@example.com"
              placeholderTextColor={placeholderColor}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="flex-1 py-3.5 ml-3 text-sm font-semibold text-slate-900 dark:text-white"
            />
          </View>
          {emailError ? (
            <Text className="text-xs font-semibold text-red-500 mt-1.5 ml-1">{emailError}</Text>
          ) : null}
        </View>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          className="bg-primary rounded-2xl py-4 items-center"
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-black text-sm">Send Reset Code</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}